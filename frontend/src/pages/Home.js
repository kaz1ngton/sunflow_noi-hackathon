import { useState } from 'react'
import { FileForm } from '../components/FileForm'
import { Chart } from '../components/Chart'
import { mapDataset } from '../utils/mapDatasets'
import { useFirstDatasetSeries, useSecondDatasetSeries } from '../utils/getSeries'

export const Home = () => {
    const [rawFile, setRawFile] = useState(null)
    const [preprocessedFile, setPreprocessedFile] = useState(null)
    const [predictedFile, setPredictedFile] = useState(null)


    const [fadeRawFile, setFadeRawFile] = useState(false)
    const [fadePredictedFile, setFadePredictedFile] = useState(true)

    const handleSelect = (data) => {
        const mappedData = mapDataset(data, 1000)
        setRawFile(mappedData)
    }

    const handleResponse = (data) => {
        setPreprocessedFile(data.preprocessed)
        setPredictedFile(data.predicted)
    }
    const firstDatasetSeries = useFirstDatasetSeries(rawFile, rawFile)
    const secondDatasetSeries = useSecondDatasetSeries(rawFile, rawFile)

    return (
        <div>
            {!rawFile && (
                <FileForm onResponse={handleResponse} onSelect={handleSelect} />
            )}

            

            {preprocessedFile && (
                <>  
                    {(!fadeRawFile && rawFile) ?(
                        <div>
                            <h3>Raw file</h3>
                        </div>
                    ):(<></>)}

                    <div>
                        <h3>Preprocessed file</h3>
                    </div>   

                    {(!fadePredictedFile && predictedFile) ?(
                        <div>
                            <h3>Predicted file</h3>
                        </div>
                    ):(<></>)}


                    <Chart
                        yAxisLabel={'Power (W)'}
                        serieses={
                            rawFile[0]['Power'] ? firstDatasetSeries : secondDatasetSeries
                        }
                        yAxisText={'Power (W)'}
                    />


                    {(fadeRawFile && !fadePredictedFile)? (
                        <div class="charts-buttons">
                            <label>
                            <h3>Raw/Preprocessed</h3>
                            <input type="checkbox" className="checkbox" id="raw" onClick={()=>{
                                setFadePredictedFile(true);
                                setFadeRawFile(false);}
                                }unchecked />
                            </label>


                            <label>
                            <h3>Preprocessed/Predicted</h3>
                            <input type="checkbox" className="checkbox" id="predicted" onClick={()=>{
                                setFadeRawFile(false);
                                setFadePredictedFile(true);
                                document.getElementById("raw").checked = true;}
                                }checked/>
                            </label>
                        </div>
                    ) : (
                        <div class="charts-buttons">
                            <label>
                            <h3>Raw/Preprocessed</h3>
                            <input type="checkbox" className="checkbox" id="raw" onClick={()=>{
                                setFadePredictedFile(false);
                                setFadeRawFile(true);}
                                }checked />
                            </label>


                            <label>
                            <h3>Preprocessed/Predicted</h3>
                            <input type="checkbox" className="checkbox" id="predicted" onClick={()=>{
                                setFadeRawFile(true);
                                setFadePredictedFile(false);
                                document.getElementById("raw").checked = false;}
                                }uncheced/>
                            </label>
                        </div>

                    )}
                </>        
            )}
               
        </div>
    )
}
