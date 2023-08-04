import { useState } from 'react'
import { FileForm } from '../components/FileForm'
import Chart1 from '../components/Chart1'

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

    return (
        <div>
            {rowFile ? (
                <div>
                    <h3>Row file</h3>
                </div>
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
            <Chart1 data={rowFile}/>
        </div>
    )
}
