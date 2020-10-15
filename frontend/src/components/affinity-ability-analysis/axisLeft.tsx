import React from "react";

function AxisLeft({ yScale, width, height }) {
 const textPadding = -20;
 const labelPadding = -30;
const ylabel =<text className='label-text' transform={`translate(${labelPadding},${height/2}) rotate(-90)`}>log(k <tspan baselineShift="-30%">a</tspan> )</text>
    const axis = yScale.ticks(5).map((d, i) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: "#000000", opacity: i===0 || i===yScale.ticks(5).length-1? 1: 0.1 }}
        y1={yScale(d)}
        y2={yScale(d)}
        x1={0}
        x2={width}
      />
      <text
        style={{ fontSize: 12 }}
        x={textPadding}
        dy=".32em"
        y={yScale(d)}
      >
        {d}
      </text>
    </g>
  ));
    return <>{ylabel}{axis}</>;
}

export default AxisLeft;