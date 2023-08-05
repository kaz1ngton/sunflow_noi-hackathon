import { useState } from 'react'
import { FileForm } from '../components/FileForm'
import { Chart } from '../components/Chart'
import { mapDataset } from '../utils/mapDatasets'
import { useFirstDatasetSeries, useSecondDatasetSeries } from '../utils/getSeries'

export const Home = () => {
    const [rowFile, setRowFile] = useState(null)
    const [preprocessedFile, setPreprocessedFile] = useState(null)
    const [predictedFile, setPredictedFile] = useState(null)

    const handleSelect = (data) => {
        const mappedData = mapDataset(data, 1000)
        setRowFile(mappedData)
    }

    const handleResponse = (data) => {
        setPreprocessedFile(data.preprocessed)
        setPredictedFile(data.predicted)
    }
    const firstDatasetSeries = useFirstDatasetSeries(rowFile, rowFile)
    const secondDatasetSeries = useSecondDatasetSeries(rowFile, rowFile)

    return (
        <div>
            {rowFile ? (
                <Chart
                    yAxisLabel={'Power (W)'}
                    serieses={
                        rowFile[0]['Power'] ? firstDatasetSeries : secondDatasetSeries
                    }
                    yAxisText={'Power (W)'}
                />
            ) : (
                <FileForm onResponse={handleResponse} onSelect={handleSelect} />
            )}

            {preprocessedFile && (
                <div>
                    <h3>Preprocessed file</h3>
                </div>
            )}

            {predictedFile && (
                <div>
                    <h3>Predicted file</h3>
                </div>
            )}
        </div>
    )
}
