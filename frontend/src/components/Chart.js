import { useLayoutEffect, useRef } from 'react'

import React from 'react'

import * as am5 from "@amcharts/amcharts5";

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

export const Chart = ({ yAxisText, yAxisLabel, serieses }) => {
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
        
        chart.get("colors").set("colors", [
            am5.color(0xEC241E),
            am5.color(0xF7B51C),
            am5.color(0xE1811B),
            am5.color(0x60F40C),
            am5.color(0x19C619)
          ]);

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

        


        serieses.forEach(({ name, valueYField, categoryXField, reference, hidden}) => {
            const series = chart.series.push(
                LineSeries.new(root, {
                    name,
                    xAxis,
                    yAxis,
                    valueYField,
                    categoryXField,
                    hidden,
                    tooltip: Tooltip.new(root, {
                        pointerOrientation: 'horizontal',
                        labelText: `${name} - {valueY}`,
                    }),
                })
            )
            
            if (!hidden)
            series.hide();

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
        xAxisRef.current?.data.setAll(serieses?.[0]?.data)
        serieses.forEach((series) => {
            series.reference.current.data.setAll(series.data)
        })
    }, [serieses])

    return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}
