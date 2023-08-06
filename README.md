# Sunflow - [NOI Hackathon 2023 Summer Edition](https://hackathon.bz.it/?mtm_campaign=Summer+Hackathon+2023)

Sunflow - app for prediction weather and temperature data processing

A data processing neural network with a task to predict the future energy consumption of a building and estimate the total energy import needed. The focus of the project is to create a complete web app that can process not only given files but also any JSON file in the same format. The frontend of the app creates a better user experience through a highly customizable interface, that also gives some mathematical analysis of the data. The backend of the app is a neural network that processes the data and predicts the future energy consumption of the building. The app is written in technologies that are used in Matrycs, so it can be easily integrated into the existing system.

Task was given by [Matrycs](https://matrycs.eu/) with time limit of `24 hours`.

## Table of contents

-   [Technologies](#technologies)
-   [Setup and run](#setup-and-run)

## Technologies

| Technology | Version |
| :--------: | :-----: |
|   React    |   18    |
|  amChart   |    5    |
|  FastApi   |  0.100  |

## Setup and run

### Frontend

1. Install dependencies

```bash
yarn
```

2. Run the app

```bash
yarn dev

open http://localhost:3000
```

### Backend

1. Install dependencies

```bash
pip install -r requirements.txt
```

2. Run the app

```bash
python -m uvicorn app.main:app --reload --port 8080
```
