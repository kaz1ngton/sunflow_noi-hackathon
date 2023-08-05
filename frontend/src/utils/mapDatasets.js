import { pickByLimit } from './pickByLimit'

const mapFirstDataset = (data, limit) => {
    const mappedData = pickByLimit(data.filter(Boolean), limit).map((dataItem) => {
        const { Year, Month, Day, Timestamp } = dataItem

        const [Hour, Minute, Second] = Timestamp.slice(0, -2).split(':')

        return {
            Power: dataItem['Power (W)'],
            Timestamp: `${Day}/${Month}/${Year}`,
            Date: new Date(Year, Month, Day, Hour, Minute, Second),
        }
    })

    mappedData.sort((a, b) => a.Date - b.Date)

    return mappedData
}

const mapSecondDataset = (data, limit) => {
    const mappedData = pickByLimit(data, limit).map((dataItem) => {
        const date = dataItem['Date and time']
        const [day, month, year] = date.split(' ')[0].split('/')
        const [hour, minute] = date.split(' ')[1].split(':')

        return {
            ...dataItem,
            Timestamp: `${day}/${month}/${year}`,
            Date: new Date(year, month, day, hour, minute),
        }
    })

    return mappedData
}

export const mapDataset = (data, limit = 1000) => {
    if (!data || data.length === 0) {
        return []
    }

    if (data[0]['Timestamp'] !== undefined) {
        return mapFirstDataset(data, limit)
    } else {
        return mapSecondDataset(data, limit)
    }
}
