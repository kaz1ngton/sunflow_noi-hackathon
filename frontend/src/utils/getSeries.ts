import { useRef } from 'react'
import { IChartDataset, ISeries } from '../types'
import { LineSeries } from '@amcharts/amcharts5/xy'

type UseDatasetSeries = ({
  raw,
  rawParsed,
  preprocessed,
}: {
  raw: IChartDataset
  rawParsed: [IChartDataset, IChartDataset]
  preprocessed: IChartDataset
}) => ISeries[]

export const useDatasetSeries: UseDatasetSeries = ({
  raw,
  preprocessed,
  rawParsed,
}) => {
  return [
    {
      name: 'Start data',
      valueYField: 'Power',
      categoryXField: 'Timestamp',
      reference: useRef<LineSeries>(null!),
      data: raw,
      hidden: true,
    },
    {
      name: 'Consumption',
      valueYField: 'Power',
      categoryXField: 'Timestamp',
      reference: useRef<LineSeries>(null!),
      data: rawParsed?.[0],
      hidden: false,
    },
    {
      name: 'Production',
      valueYField: 'Power',
      categoryXField: 'Timestamp',
      reference: useRef<LineSeries>(null!),
      data: rawParsed?.[1],
      hidden: false,
    },
    {
      name: 'Consumption/preprocessed',
      valueYField: 'Power',
      categoryXField: 'Timestamp',
      reference: useRef<LineSeries>(null!),
      data: preprocessed,
      hidden: false,
    },
  ]
}
