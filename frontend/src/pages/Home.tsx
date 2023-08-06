import { useState } from 'react'
import { FileForm } from '../components/FileForm'
import { Chart } from '../components/Chart'
import { parseDataset } from '../utils/parseDataset'
import { useDatasetSeries } from '../utils/getSeries'
import { IChartDataset, IDataset } from '../types'

export const Home = () => {
  const [showChart, setShowChart] = useState(false)

  const [rawDataset, setRawDataset] = useState<IChartDataset>([])
  const [rawParsedDataset, setRawParsedDataset] = useState<
    [IChartDataset, IChartDataset]
  >([[], []])
  const [preprocessedDataset, setPreprocessedDataset] = useState<IChartDataset>(
    [],
  )

  const handleSelect = (data: IDataset) => {
    setRawDataset(parseDataset(data, 1000))
    setRawParsedDataset(parseDataset(data, 1000, true))
    setShowChart(true)
  }

  const handleResponse = (data: IDataset) => {
    const mappedData = parseDataset(data, 1000)
    setPreprocessedDataset(mappedData)
  }

  const firstDatasetSeries = useDatasetSeries({
    raw: rawDataset,
    rawParsed: rawParsedDataset,
    preprocessed: preprocessedDataset,
  })

  console.log(firstDatasetSeries)
  return (
    <div>
      {showChart ? (
        <Chart
          yAxisLabel={'Power (W)'}
          serieses={firstDatasetSeries}
          yAxisText={'Power (W)'}
        />
      ) : (
        <FileForm onResponse={handleResponse} onSelect={handleSelect} />
      )}
    </div>
  )
}
