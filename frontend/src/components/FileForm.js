export const FileForm = ({ onSelect, onResponse }) => {
    const handleFileUpload = async (event) => {
        const file = event?.target?.files[0]

        const reader = new FileReader()
        reader.onload = (event) => {
            const fileContent = event.target.result
            const jsonData = JSON.parse(fileContent)
            onSelect?.(jsonData)
        }
        reader.readAsText(file)

        const formData = new FormData()
        formData.append('file', file)

        const result = await fetch('http://127.0.0.1:8080/predict', {
            method: 'POST',
            body: formData,
        })

        const data = await result.json()
        onResponse?.(data)
    }

    return (
        <div
            style={{
                border: '1px solid white',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <label
                htmlFor="file-upload"
                style={{
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    padding: '10px 50px',
                    fontSize: '20px',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}
            >
                Select file
            </label>
            <input
                style={{
                    opacity: 0,
                    position: 'absolute',
                    zIndex: '-1',
                }}
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
            />
        </div>
    )
}
