import json
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

from app.services.preprocess import preprocess

router = APIRouter()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        json_string = contents.decode("utf-8")
        preprocessed_json = preprocess(json_string)

        content = {
            "preprocessed": preprocessed_json,
            "predicted": json_string,
        }

        return JSONResponse(content, status_code=200)
    except Exception as e:
        print(e)
        return JSONResponse(content={"error": "Invalid JSON format"}, status_code=400)
