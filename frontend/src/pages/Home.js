import { useRef, useState } from 'react'
import { FileForm } from '../components/FileForm'
import { Chart } from '../components/Chart'

export const Home = () => {
    const [rowFile, setRowFile] = useState(null)
    const [preprocessedFile, setPreprocessedFile] = useState(null)
    const [predictedFile, setPredictedFile] = useState(null)

    const handleSelect = (file) => {
        const filteredFile = file.filter(Boolean)

        setRowFile(filteredFile)
    }

    const handleResponse = (data) => {
        setPreprocessedFile(data.preprocessed)
        setPredictedFile(data.predicted)
    }

    const rowChartSeries = [
        {
            name: 'Power',
            valueYField: 'Power',
            categoryXField: 'Timestamp',
            reference: useRef(null),
        },
    ]

    return (
        <div>
            {rowFile ? (
                <Chart
                    data={rowFile}
                    yAxisLabel={'Power (W)'}
                    serieses={rowChartSeries}
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
