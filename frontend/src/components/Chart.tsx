import { useLayoutEffect, useRef } from 'react'

import { Label, Legend, Root, Tooltip, p50, color } from '@amcharts/amcharts5'
import {
  AxisRenderer,
  AxisRendererX,
  AxisRendererY,
  CategoryAxis,
  LineSeries,
  ValueAxis,
  XYChart,
  XYCursor,
} from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Dark'
import { ISeries } from '../types'

interface IChartProps {
  yAxisText: string
  yAxisLabel: string
  serieses: ISeries[]
}

export const Chart = ({ yAxisText, yAxisLabel, serieses }: IChartProps) => {
  const xAxisRef = useRef<CategoryAxis<AxisRenderer> | null>(null)

  useLayoutEffect(() => {
    const root = Root.new('chartdiv')

    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      }),
    )

    chart
      .get('colors')
      ?.set('colors', [
        color(0xec241e),
        color(0xf7b51c),
        color(0xe1811b),
        color(0x60f40c),
        color(0x19c619),
      ])

    const yAxis = chart.yAxes.push(
      ValueAxis.new(root, {
        renderer: AxisRendererY.new(root, {}),
      }),
    )

    const xAxis = chart.xAxes.push(
      CategoryAxis.new(root, {
        renderer: AxisRendererX.new(root, {}),
        categoryField: 'Timestamp',
        tooltip: Tooltip.new(root, {}),
        maxDeviation: 0.2,
      }),
    )

    yAxis.children.push(
      Label.new(root, {
        text: yAxisText,
        textAlign: 'center',
        y: p50,
        rotation: -90,
      }),
    )

    serieses.forEach(
      ({ name, valueYField, categoryXField, reference, hidden }) => {
        const series = chart.series.push(
          LineSeries.new(root, {
            name,
            xAxis,
            yAxis,
            valueYField,
            categoryXField,
            tooltip: Tooltip.new(root, {
              pointerOrientation: 'horizontal',
              labelText: `${name} - {valueY}`,
            }),
          }),
        )

        if (!hidden) series.hide()

        if (reference) {
          reference.current = series
        }
      },
    )

    const legend = chart.children.push(Legend.new(root, {}))
    legend.data.setAll(chart.series.values)

    chart.set('cursor', XYCursor.new(root, {}))

    xAxisRef.current = xAxis

    return () => {
      root.dispose()
    }
  }, [serieses, yAxisLabel, yAxisText])

  useLayoutEffect(() => {
    xAxisRef.current?.data?.setAll(serieses?.[0]?.data)
    serieses.forEach((series) => {
      series.reference?.current?.data?.setAll(series.data)
    })
  }, [serieses])

  return <div id="chartdiv" style={{ width: '80vw', height: '500px' }}></div>
}
