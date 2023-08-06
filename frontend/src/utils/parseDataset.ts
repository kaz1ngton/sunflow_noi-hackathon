import { IChartDataset, IDataset } from '../types'
import { pickByLimit } from './pickByLimit'

export function parseDataset(data: IDataset, limit: number): IChartDataset
export function parseDataset(
  data: IDataset,
  limit: number,
  split: boolean,
): [IChartDataset, IChartDataset]

export function parseDataset(data: IDataset, limit: number, split?: boolean) {
  const mappedData = pickByLimit(data.filter(Boolean), limit).map((row) => {
    const { Year, Month, Day, Timestamp } = row

    let date
    if (typeof Timestamp === 'string') {
      const [Hour, Minute, Second] = Timestamp.slice(0, -2).split(':')
      date = new Date(
        Year,
        Month,
        Day,
        parseInt(Hour),
        parseInt(Minute),
        parseInt(Second),
      )
    } else {
      const Hour = Math.floor(Timestamp / 3600)
      const Minute = Math.floor((Timestamp - Hour * 3600) / 60)
      const Second = Timestamp - Hour * 3600 - Minute * 60
      date = new Date(Year, Month, Day, Hour, Minute, Second)
    }

    return {
      Power: row['Power (W)'],
      Timestamp: `${Day}/${Month}/${Year}`,
      Date: date,
      Year: Number(Year),
    }
  })

  if (!split) {
    mappedData.sort((a, b) => a.Date.getTime() - b.Date.getTime())
    return mappedData
  }

  const consumptionDataset: IChartDataset = []
  const productionDataset: IChartDataset = []

  let isProducing = false

  for (let i = 1; i < mappedData.length; i++) {
    const currentItem = mappedData[i]
    const prevItem = mappedData[i - 1]

    if (
      !isProducing &&
      prevItem.Date.getFullYear() > currentItem.Date.getFullYear()
    ) {
      isProducing = true
    }

    ;(isProducing ? productionDataset : consumptionDataset).push(currentItem)
  }

  return [consumptionDataset, productionDataset]
}
