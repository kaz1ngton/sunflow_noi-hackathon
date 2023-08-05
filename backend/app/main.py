from fastapi import FastAPI, APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

import json
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np

import matplotlib.pyplot as plt

plt.rcParams["figure.figsize"] = [10, 5]


def run_pre_process(dataset_path) -> str:
    """TODO:"""
    dataframe = pd.read_json(dataset_path)

    # Drop Correlative
    print("Dropping correlative columns...")
    upper_corr = dataframe.corr().where(
        np.triu(np.ones(dataframe.corr().shape), k=1).astype(bool)
    )
    to_drop = [
        column for column in upper_corr.columns if any(upper_corr[column] > 0.95)
    ]
    dataframe.drop(to_drop, axis=1, inplace=True)
    print(f"Dropped: {to_drop}")

    # Filtering out non-consequential data
    new_dataframe = dataframe[
        : dataframe["Year"].diff()[dataframe["Year"].diff() < 0].index[0]
    ]
    print(
        f"Dropped {dataframe.shape[0] - new_dataframe.shape[0]} rows as data is non-consequent"
    )
    dataframe = new_dataframe

    # Parse time
    print("Parsing timestmap")
    dataframe["Timestamp"] = (
        dataframe["Timestamp"].dt.hour * 3600
        + dataframe["Timestamp"].dt.minute * 60
        + dataframe["Timestamp"].dt.second
    ).astype("int")

    return dataframe.to_json(orient="table")


app = FastAPI(
    title="Sunflowe application",
    description="A data prosessing neural network with a task to predict future temperature inside/outside of a building and power consumption of it",
    version="0.0.0",
    docs_url="/docs",
)

router = APIRouter()


def preprocess(data: dict) -> dict:
    return {
        "preprocessed": run_pre_process(
            "/Users/dmitriiforofontov/bin/repos/sunflow_noi-hackathon/dataset_1.json"
        ),
        "predicted": data,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        json_string = contents.decode("utf-8")
        json_dict = json.loads(json_string)
        preprocessed_json = preprocess(json_dict)
        return JSONResponse(content=preprocessed_json, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": "Invalid JSON format"}, status_code=400)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app)
