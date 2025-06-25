import os
from logging import getLogger, DEBUG, INFO, Formatter
from logging.config import dictConfig
from logging.handlers import HTTPHandler
from datetime import datetime, timezone, timedelta

HOST = "hooks.slack.com"
PATH = os.getenv("SLACK_WEBHOOK_URL")  

class SlackHandler(HTTPHandler):
    def __init__(self):
        super().__init__(HOST, PATH, method="POST", secure=True)

    def mapLogRecord(self, record):
        text = self.format(record)
        return {"payload": {"text": text}}

class JSTFormatter(Formatter):
    def formatTime(self, record, datefmt=None):
        dt = datetime.fromtimestamp(record.created, tz=timezone.utc).astimezone(timezone(timedelta(hours=9)))
        if datefmt:
            return dt.strftime(datefmt)
        return dt.strftime("%Y-%m-%d %H:%M:%S")

logging_config = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            "()": JSTFormatter
        }
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "level": "INFO",
            "formatter": "default",
            "stream": "ext://sys.stdout"
        },
        "console": {
        "class": "logging.StreamHandler",
        "level": "DEBUG",
        "formatter": "default",
        "stream": "ext://sys.stdout"
        },
        "slack": {
            "()": SlackHandler,
            "level": "ERROR",
            "formatter": "default"
        }
    },
    "root": {
        "level": "DEBUG",
        "handlers": ["console", "slack"]
    }
}

dictConfig(logging_config)

def get_logger(name: str):
    return getLogger(name)