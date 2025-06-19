import os
from collections.abc import Generator
from contextlib import contextmanager
from urllib.parse import quote_plus

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sshtunnel import SSHTunnelForwarder

load_dotenv()

ENV = os.getenv("ENV")

def create_db_url() -> str:
    user = quote_plus(os.getenv("DB_USER"))
    password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")

    if ENV == "local-dev":
        return f"postgresql://{user}:{password}@127.0.0.1:5433/{db_name}"
    if ENV == "local":
        return f"postgresql://{user}:{password}@127.0.0.1:5432/{db_name}"
    
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT", "5432")
    return f"postgresql://{user}:{password}@{host}:{port}/{db_name}"


@contextmanager
def setup_ssh_tunnel():
    """SSHトンネルを設定するコンテキストマネージャー (Single Tunnel)"""

    bastion_host = os.getenv("BASTION_HOST")
    bastion_user = os.getenv("BASTION_USER")
    private_key = os.getenv("PRIVATE_KEY")  # Optional: use if needed
    rds_host = os.getenv("DB_HOST")
    rds_port = int (os.getenv("DB_PORT", 5432))

    if ENV == "local-dev":
        with SSHTunnelForwarder(
            (bastion_host, 22),
            ssh_username=bastion_user,
            ssh_pkey=private_key,
            remote_bind_address=(rds_host, rds_port),
            local_bind_address=("127.0.0.1", 5433),
        ) as tunnel:
            tunnel.start()
            try:
                yield 
            finally:
                tunnel.stop()
    else:
        yield


def get_engine():
    return create_engine(
        create_db_url(),
        pool_pre_ping=True,
        pool_recycle=3600,
    )


def get_db() -> Generator[Session, None, None]:

    if ENV == "local":
        engine = get_engine()

        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()
            engine.dispose()

    else:
        with setup_ssh_tunnel():
            engine = get_engine()
            SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
            db = SessionLocal()
            try:
                yield db
            finally:
                db.close()
                engine.dispose()
