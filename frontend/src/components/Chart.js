import { useLayoutEffect, useRef } from 'react'

import React from 'react'

import { Label, Legend, Root, Tooltip, p50 } from '@amcharts/amcharts5'
import {
    AxisRendererX,
    AxisRendererY,
    CategoryAxis,
    LineSeries,
    ValueAxis,
    XYChart,
    XYCursor,
} from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Dark'

export const Chart = ({ data, limit = 1000, yAxisText, yAxisLabel, serieses }) => {
    const stepSize = Math.max(1, Math.floor(data.length / limit))
    const selectedData = []

    for (let i = 0; i < data.length; i += stepSize) {
        selectedData.push(data[i])
    }

    const dataPoints = selectedData.map((dataItem) => {
        const { Year, Month, Day, Timestamp } = dataItem
        const [Hour, Minute, Second] = Timestamp.slice(0, -2).split(':')

        return {
            Power: dataItem['Power (W)'],
            Timestamp: `${Day}/${Month}/${Year}`,
            Date: new Date(Year, Month, Day, Hour, Minute, Second),
        }
    })

    dataPoints.sort((a, b) => a.Date - b.Date)

    const xAxisRef = useRef(null)

    useLayoutEffect(() => {
        const root = Root.new('chartdiv', XYChart)

        root.setThemes([am5themes_Animated.new(root)])

        const chart = root.container.children.push(
            XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout,
            })
        )

        const yAxis = chart.yAxes.push(
            ValueAxis.new(root, {
                renderer: AxisRendererY.new(root, {}),
            })
        )

        const xAxis = chart.xAxes.push(
            CategoryAxis.new(root, {
                renderer: AxisRendererX.new(root, {}),
                categoryField: 'Timestamp',
                tooltip: Tooltip.new(root, {}),
                maxDeviation: 0.2,
            })
        )

        yAxis.children.push(
            Label.new(root, {
                text: yAxisText,
                textAlign: 'center',
                y: p50,
                rotation: -90,
            })
        )

        serieses.forEach(({ name, valueYField, categoryXField, reference }) => {
            const series = chart.series.push(
                LineSeries.new(root, {
                    name,
                    xAxis,
                    yAxis,
                    valueYField,
                    categoryXField,
                    tooltip: Tooltip.new(root, {
                        pointerOrientation: 'horizontal',
                        labelText: '{valueY}',
                    }),
                })
            )

            if (reference) {
                reference.current = series
            }
        })

        const legend = chart.children.push(Legend.new(root, {}))
        legend.data.setAll(chart.series.values)

        chart.set('cursor', XYCursor.new(root, {}))

        xAxisRef.current = xAxis

        return () => {
            root.dispose()
        }
    }, [serieses, yAxisLabel, yAxisText])

    useLayoutEffect(() => {
        xAxisRef.current.data.setAll(dataPoints)

        serieses.forEach((series) => {
            series.reference.current.data.setAll(dataPoints)
        })
    }, [dataPoints, serieses])

    return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}
