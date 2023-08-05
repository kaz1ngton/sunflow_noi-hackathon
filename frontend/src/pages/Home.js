import { useState } from 'react'
import { FileForm } from '../components/FileForm'
import { Chart } from '../components/Chart'
import { mapDataset } from '../utils/mapDatasets'
import { useFirstDatasetSeries, useSecondDatasetSeries } from '../utils/getSeries'

export const Home = () => {
    const [allRawData, setAllRawData] = useState(null)
    const [rawFile, setRawFile] = useState(null)
    const [preprocessedFile, setPreprocessedFile] = useState(null)

    const handleSelect = (data) => {
        const mappedData = mapDataset(data, 1000)
        setRawFile(mappedData)
        const allData = mapDataset(data, 1000, true)
        setAllRawData(allData)
    }

    const handleResponse = (data) => {
        const mappedData = mapDataset(data, 1000)
        setPreprocessedFile(mappedData)
    }

    const firstDatasetSeries = useFirstDatasetSeries(
        allRawData,
        rawFile,
        preprocessedFile
    )
    const secondDatasetSeries = useSecondDatasetSeries(rawFile, preprocessedFile)

    return (
        <div>
            {!rawFile && <FileForm onResponse={handleResponse} onSelect={handleSelect} />}

            {preprocessedFile && (
                <Chart
                    yAxisLabel={'Power (W)'}
                    serieses={
                        rawFile[0][0]['Power'] ? firstDatasetSeries : secondDatasetSeries
                    }
                    yAxisText={'Power (W)'}
                />
            )}
        </div>
    )
}
