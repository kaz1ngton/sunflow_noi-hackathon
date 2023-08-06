import { ChangeEvent } from 'react'
import { IDataset } from '../../types'
import { routes } from '../../api/routes'

import styles from './styles.module.css'

interface IFileFormProps {
  onSelect: (data: IDataset) => void
  onResponse: (data: IDataset) => void
}

export const FileForm = ({ onSelect, onResponse }: IFileFormProps) => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] as File

    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event?.target?.result as string
      const jsonData = JSON.parse(fileContent)

      onSelect?.(jsonData)
    }

    reader.readAsText(file)

    const formData = new FormData()
    formData.append('file', file)

    const result = await fetch(routes.predict, {
      method: 'POST',
      body: formData,
    })

    const data = await result.json()
    const dataset = JSON.parse(data.preprocessed)
    onResponse?.(dataset)
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="file-upload" className={styles.button}>
        SELECT FILE
      </label>
      <input
        className={styles.input}
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
      />
    </div>
  )
}
