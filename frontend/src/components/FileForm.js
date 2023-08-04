import React from 'react'
import { useForm } from "react-hook-form";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const FileForm = () => {
    const { register, handleSubmit } = useForm();
    

    const onSubmit = (dataJSON) => {

    console.log(dataJSON);
    
    /* 

    componentDidMount();{

        
        var chart = am4core.createFromConfig({
            // Create pie series
            "series": [{
                    "type": "XYChart",
                    
                }],
            "data": JSON.stringify(dataJSON),
            "legend": {}
        }, "chartdiv", am4charts.XYChart);
        this.chart = chart;
    }

    render(); {
        return (
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        );
    }
     */  
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("file")} />

                <input type="submit" />
            </form>
        </div>
    )
}

export default FileForm