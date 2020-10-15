import React from "react";
import { ValueToUnit } from "../../utils/valueToUnit";

function AxisKD({ xScale, yScale, width, tickArr}) {
    const KDlabel =<text className='label-text' transform={`translate(${width-50},-20)`}>K <tspan baselineShift="-30%">D</tspan></text>
    const arrYScale = yScale.ticks(5);
    const arrAbsYScale = yScale.ticks(5).map((d,i)=>(Math.abs(d)));
    const arrXScale = xScale.ticks(7);
    const arrAbsXScale = xScale.ticks(7).map((d,i)=>(Math.abs(d)));
    const axis = tickArr.map((d, i)=>{
        let x1 = -1, x2 = -1, y1 = -1, y2 = -1
        if(arrAbsXScale.indexOf(d - arrAbsYScale[0])!=-1){
            y1 = yScale(arrYScale[0]);
            x1 = xScale(arrXScale[arrAbsXScale.indexOf(d - arrAbsYScale[0])]);
        }
        if(arrAbsXScale.indexOf(d - arrAbsYScale[arrAbsYScale.length - 1])!=-1){
            y2 = yScale(arrYScale[arrYScale.length - 1]);
            x2 = xScale(arrXScale[arrAbsXScale.indexOf(d - arrAbsYScale[arrAbsYScale.length - 1])]);
        }
        if(arrAbsYScale.indexOf(d - arrAbsXScale[0])!=-1){
            y1 = yScale(arrYScale[arrAbsYScale.indexOf(d - arrAbsXScale[0])]);
            x1 = xScale(arrXScale[0]);
        }
        if(arrAbsYScale.indexOf(d - arrAbsXScale[arrAbsXScale.length - 1])!=-1){
            y2 = yScale(arrYScale[arrAbsYScale.indexOf(d - arrAbsXScale[arrAbsXScale.length - 1])]);
            x2 = xScale(arrXScale[arrAbsXScale.length - 1]);
        }
        return (
            <g key={i} className="KD-tick">
                <line
                    style={{ stroke: "blue" }}
                    y1={y1}
                    y2={y2}
                    x1={x1}
                    x2={x2}
                />
                <text
                    style={{ fontSize: 12 }}
                    fill='blue'
                    x={x2+5}
                    dy=".32em"
                    y={y2-15}
                >
                    {ValueToUnit(d)}M
                </text>
            </g>
        );
    });

    return <>{KDlabel}{axis}</>;
}

export default AxisKD;