from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import matplotlib.pyplot as plt

from app.routers import predict

plt.rcParams["figure.figsize"] = [10, 5]


app = FastAPI(
    title="Sunflowe application",
    description="A data prosessing neural network with a task to predict future temperature inside/outside of a building and power consumption of it",
    version="0.0.0",
    docs_url="/docs",
)

app.include_router(
    predict.router,
    prefix="/v1",
    tags=["predict"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app)
