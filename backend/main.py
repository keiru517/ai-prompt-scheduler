from fastapi import FastAPI
from fastapi.responses import Response

from routers import user_public_rotuer, user_protect_router

app = FastAPI()

app.include_router(user_public_rotuer)
app.include_router(user_protect_router)


@app.get("/api/health-check", status_code=204)
def health_check():
    return Response(content=None, status_code=204)
