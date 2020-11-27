import React from "react";

function Legend({ groups, width }) {
    const lengendPadding = 20;
    const lengendColorPadding = 140;
    const lengendTextPadding = 160;
    const legend = groups.map((group, i) => (
        <g key={i} className="legend">
        <circle
            r={5}
            cx={width+lengendColorPadding}
            cy={70+i*lengendPadding}
            fill={group.color}
        />
        <text
            style={{ fontSize: 12 }}
            x={width+lengendTextPadding}
            dy=".32em"
            y={70+i*lengendPadding}
        >
            {group.name}
        </text>
        </g>
    ));
    return <>{legend}</>;
}

export default Legend;