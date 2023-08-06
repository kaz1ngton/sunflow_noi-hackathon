export interface IRow {
  Year: number
  Month: number
  Day: number
  Timestamp: string
  'Power (W)': number
}

export type IDataset = IRow[]
