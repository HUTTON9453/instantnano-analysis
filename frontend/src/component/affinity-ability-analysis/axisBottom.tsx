import React from "react";

function AxisBottom({ xScale, width, height }) {
  const textPadding = 10;
  const labelPadding = 35;

  const xlabel =<text className='label-text' transform={`translate(${width/2},${height+labelPadding})`}>log(k <tspan baselineShift="-30%">d</tspan> )</text>
  const axis = xScale.ticks(7).map((d, i) => (
    <g className="x-tick" key={i}>
      <line
        style={{ stroke: "#000000" }}
        y1={0}
        y2={height}
        x1={xScale(d)}
        x2={xScale(d)}
      />
      <text
        style={{ textAnchor: "middle", fontSize: 12 }}
        dy=".71em"
        x={xScale(d)}
        y={height + textPadding}
      >
        {d}
      </text>
    </g>
  ));
  return <>{xlabel}{axis}</>;
}

export default AxisBottom;