import {  useLayoutEffect, useRef  } from "react";

import React from 'react'

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";



const Chart1 = (props) => {
  const series1Ref = useRef(null);
  const series2Ref = useRef(null);
  const xAxisRef = useRef(null);

  // This code will only run one time
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "Timestamp"
      })
    );

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "Power (W)",
        categoryXField: "Timestamp"
      })
    );

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "Energy (Wh)",
        categoryXField: "Timestamp"
      })
    );

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    xAxisRef.current = xAxis;
    series1Ref.current = series1;
    series2Ref.current = series2;

    return () => {
      root.dispose();
    };
  }, []);

  // This code will only run when props.data changes
  const filtered = props.data?.filter(Boolean)
  useLayoutEffect(() => {

    if (filtered) {
      xAxisRef.current.data.setAll(filtered);
      series1Ref.current.data.setAll(filtered);
      series2Ref.current.data.setAll(filtered);
      
    }

  }, [filtered]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}

export default Chart1