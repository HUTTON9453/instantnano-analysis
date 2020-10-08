import React, { useContext, useEffect, useState } from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { extent } from 'd3-array';
import AxisLeft from './axisLeft';
import AxisBottom from './axisBottom';
import './scatter.css'
import TextField from '@material-ui/core/TextField/TextField';
import { ChromePicker } from 'react-color'
import { DataContext } from '../../context/data.context';
import { Data } from '../../models/data.model';
import { Button } from '@material-ui/core';
import Legend from './legend';
import AxisKD from './axisKD';
import toImg from 'react-svg-to-image';

const Tooltip = ({ x, y, info }) => (
  <foreignObject x={x + 10} y={y + 10} width={100} height={80}>
    <div className="tooltip-title">
    	Group: {info.data.group}
    </div>
	<div className="tooltip-content">
		<div >kd: {info.data.kd}</div>
		<div>ka: {info.data.ka}</div>
		<div>KD: {info.data.KD}</div>
	</div>
  </foreignObject>
);
const w = 900,
h = 600,
margin = {
	top: 40,
	bottom: 80,
	left: 80,
	right: 190
};

const defaultKDAxis = [7,8,9,10,11,12]

function Scatter() {
	const [showTooltip, setShowTooltip] = useState<{data:Data, show:Boolean}>({data:{kd:0,ka:0,KD:0, group:'default'},show:false});
	const [ color, setColor] = useState("#000000");
	const { data, insertData, updateData, setData } = useContext(DataContext);
	const [ ka, setka] = useState(0);
	const [ kd, setkd] = useState(0);
	const [ KD, setKD] = useState(0);
	const [ group, setGroup] = useState('default');
	const [ allColors, setAllColors] = useState(['#000000']);
	const [ allGroups, setAllGroups] = useState(['default']);
	var colors = scaleOrdinal()
    .domain(allGroups)
    .range(allColors)
	//const xMinAndMax =extent<number>(data.map((d:Data)=>{return Math.log(d.kd)/Math.log(10)}))
	//const xDomain=[xMinAndMax[0]!, xMinAndMax[1]!]
	const xDomain=[-7,-2]
	//const yMinAndMax =extent<number>(data.map((d:Data)=>{return Math.log(d.ka)/Math.log(10)}))
	//const yDomain=[yMinAndMax[0]!, yMinAndMax[1]!]
	const yDomain=[2,8]
	const width = w - margin.right - margin.left,
		height = h - margin.top - margin.bottom;
	const xScale = scaleLinear().domain(xDomain).range([ 0, width ]);
	const yScale = scaleLinear().domain(yDomain).range([ height, 0 ]);

	const handleDownload = () => {
		toImg('svg', 'INB IN-Ab Analysis Report_Example').then(fileData => {
			const temp = data;
			window.location.reload(false);
			setData(temp);
		  });
	}

	const handleDataClick = () => {
		setColor(colors(showTooltip.data.group) as string);
		setGroup(showTooltip.data.group);
		setKD(showTooltip.data.KD);
		setkd(showTooltip.data.kd);
		setka(showTooltip.data.ka);
	}

    const handleInsert = () => {
		const newData:Data={kd: kd, ka: ka, KD: KD, group: group};
		if(!allGroups.includes(group) && !allColors.includes(color)){
			setAllGroups(allGroups.concat(group));
			setAllColors(allColors.concat(color));
		}
		insertData(newData);
	};

	const handleUpdate = () => {
		const newData:Data={kd: kd, ka: ka, KD: KD, group: group};
		if(!allGroups.includes(group) && !allColors.includes(color)){
			setAllGroups(allGroups.concat(group));
			setAllColors(allColors.concat(color));
		}
		updateData(newData)
	}

	const circles = data.map((d, i) => (
		<circle key={i} r={5} className="data-circle" cx={xScale(Math.log(d.kd)/Math.log(10))} cy={yScale(Math.log(d.ka)/Math.log(10))} 
		fill={colors(d.group) as string}
		onClick={handleDataClick}
		onMouseOver={()=> setShowTooltip({data:d,show:true})}
		onMouseOut={() => setShowTooltip({data:d,show:false})} />
	))




	const Tooltips = <Tooltip
		x={xScale(Math.log(showTooltip?.data.kd!)/Math.log(10))}
		y={yScale(Math.log(showTooltip?.data.ka!)/Math.log(10))}
		info={showTooltip}
  	/>
	return (
		<div>
			<div className='row justify-content-center' >
			<svg id='scatter-plot' width={w} height={h}>
				<g transform={`translate(${margin.left},${margin.top})`} >
					<AxisLeft yScale={yScale.nice()} width={width} height={height}/>
					<AxisBottom xScale={xScale.nice()} width={width} height={height} />
					<AxisKD xScale={xScale.nice()} yScale={yScale.nice()} width={width} height={height} tickArr={defaultKDAxis} />
					{circles}
					{showTooltip?.show&&Tooltips}
				</g>
				<Legend groups={allGroups} colors={allColors} width={width}></Legend>
			</svg>
			</div>
			
			<div className='row'>
				<div className='col-3'>
					<TextField label="ka" variant="outlined" value={ka} onChange={(event)=>setka(event.target.value as unknown as number)}/>
				</div>
				<div className='col-3'>
					<TextField label="kd" variant="outlined" value={kd} onChange={(event)=>setkd(event.target.value as unknown as number)}/>
				</div>
				<div className='col-3'>
					<TextField label="KD" variant="outlined" value={KD} onChange={(event)=>setKD(event.target.value as unknown as number)}/>
				</div>
			</div>
			<div className='row mt-3'>
				<div className='col-3'>
					<ChromePicker
						color={color}
						onChange={color=>setColor(color['hex'])}
					/>
				</div>
				<div className='col-3'>
					<TextField label="Group" variant="outlined" value={group} onChange={(event)=>{setGroup(event.target.value);setColor(colors(event.target.value) as string)}}/>
				</div>
				<div className='col-1'>
					<Button variant="contained" color="primary" onClick={handleInsert}>新增資料</Button>
				</div>
				<div className='col-1'>
					<Button variant="contained" color="primary" onClick={handleUpdate}>編輯資料</Button>
				</div>
				<div className='col-1'>
					<Button variant="contained" onClick={handleDownload}>下載資料</Button>
				</div>
			</div>
		</div>
	);
}

export default Scatter;
