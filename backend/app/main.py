from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from .routers import health, predict

app = FastAPI(
    title="Sunflowe application",
    description="A data prosessing neural network with a task to predict future temperature inside/outside of a building and power consumption of it",
    version="0.0.0",
    docs_url="/docs",
)

app.include_router(health.router)
app.include_router(predict.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app)
