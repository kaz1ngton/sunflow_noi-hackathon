import pandas as pd
import numpy as np


def preprocess(dataset_json: str) -> str:
    dataframe = pd.read_json(dataset_json)

    # # Drop Correlative
    upper_corr = dataframe.corr().where(
        np.triu(np.ones(dataframe.corr().shape), k=1).astype(bool)
    )
    to_drop = [
        column for column in upper_corr.columns if any(upper_corr[column] > 0.95)
    ]
    dataframe.drop(to_drop, axis=1, inplace=True)

    # Filtering out non-consequential data
    new_dataframe = dataframe[
        : dataframe["Year"].diff()[dataframe["Year"].diff() < 0].index[0]
    ]
    dataframe = new_dataframe

    # Parse time
    dataframe["Timestamp"] = (
        dataframe["Timestamp"].dt.hour * 3600
        + dataframe["Timestamp"].dt.minute * 60
        + dataframe["Timestamp"].dt.second
    ).astype("int")

    return dataframe.to_json(orient="records")
