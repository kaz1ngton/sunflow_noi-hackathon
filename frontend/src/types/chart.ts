import { LineSeries } from '@amcharts/amcharts5/xy'
import { MutableRefObject } from 'react'

export interface IChartRow {
  Power: number
  Timestamp: string
  Date: Date
  Year: number
}

export type IChartDataset = IChartRow[]

export interface ISeries {
  name: string
  valueYField: string
  categoryXField: string
  reference: MutableRefObject<LineSeries>
  data: IChartDataset
  hidden?: boolean
}
