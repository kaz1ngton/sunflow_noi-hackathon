import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.neural_network import MLPRegressor

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


# dataframe.to_json(export_path, orient="table")


def run_model_train(dataframe):  # TODO: CHANGE
    """TODO:"""
    X = dataframe.loc[:, dataframe.columns != "Power (W)"]
    y = dataframe["Power (W)"]
    training_set, validation_set = train_test_split(
        dataframe, test_size=0.2, random_state=21
    )
    X_train = training_set.iloc[:, 0:-1].values
    Y_train = training_set.iloc[:, -1].values
    X_val = validation_set.iloc[:, 0:-1].values
    y_val = validation_set.iloc[:, -1].values
    mlp_regressor = MLPRegressor(hidden_layer_sizes=(4)).fit(X_train, Y_train)
    y_predict = mlp_regressor.predict(X_val)
    # TODO: EVALUATE
    # input_hidden_weights = mlp_regressor.coefs_[0]
    # hidden_output_weights = mlp_regressor.coefs_[-1]


def run_model_predict():
    """TODO:"""
    pass
