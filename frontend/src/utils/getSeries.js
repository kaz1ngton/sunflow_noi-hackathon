import { useRef } from 'react'

export const useFirstDatasetSeries = (compared, toCompare) => {
    return [
        {
            name: 'Consumption',
            valueYField: 'Power',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared?.[0],
        },
        {
            name: 'Production',
            valueYField: 'Power',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared?.[1],
        },
    ]
}

export const useSecondDatasetSeries = (compared, toCompare) => {
    return [
        {
            name: 'Indoor Temp room 1 (°C)',
            valueYField: 'Indoor Temp room 1 (°C)',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
        {
            name: 'Indoor Temp room 2 (°C)',
            valueYField: 'Indoor Temp room 2 (°C)',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
        {
            name: 'Indoor Temp room 3 (°C)',
            valueYField: 'Indoor Temp room 3 (°C)',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
        {
            name: 'External temperature (Celsius degree)',
            valueYField: 'External temperature (Celsius degree)',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
        {
            name: 'Flat energy (kWh)',
            valueYField: 'Flat energy (kWh)',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
        {
            name: 'Builing energy (kWh)',
            valueYField: 'Builing energy (kWh)',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
        {
            name: 'Surface',
            valueYField: 'Surface',
            categoryXField: 'Timestamp',
            reference: useRef(null),
            data: compared,
        },
    ]
}
