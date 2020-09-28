import React, { createContext, useState } from "react";
type too ={
	x:number;
	y:number;
	temparature:number;
}

const tooltipContext = createContext(false);

function useTooltip() {
  const [tooltip, setTooltip] = useState(false);

  return { tooltip, setTooltip };
}

export { useTooltip, tooltipContext };
