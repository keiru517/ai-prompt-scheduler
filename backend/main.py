from fastapi import FastAPI
from fastapi.responses import Response

from routers import user_public_rotuer

app = FastAPI()

app.include_router(user_public_rotuer)
# # Load your custom OpenAPI schema
# def custom_openapi():
#     with open("API_Spec_v1.json", "r", encoding='utf-8') as f:
#         return json.load(f)

# app.openapi = custom_openapi  # Set the custom OpenAPI schema

@app.get("/api/health-check", status_code=204)
def health_check():
    return Response(content=None, status_code=204)
