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
        json_dict = json.loads(json_string)
        preprocessed_json = preprocess(json_dict)
        return JSONResponse(content=preprocessed_json, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": "Invalid JSON format"}, status_code=400)
