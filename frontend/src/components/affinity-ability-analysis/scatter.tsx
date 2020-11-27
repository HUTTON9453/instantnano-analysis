import React, { useContext, useEffect, useState } from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import AxisLeft from './axisLeft';
import AxisBottom from './axisBottom';
import './scatter.css'
import { DataContext } from '../../contexts/data.context';
import { Data } from '../../models/data.model';
import { Button } from '@material-ui/core';
import Legend from './legend';
import AxisKD from './axisKD';
import toImg from 'react-svg-to-image';
import { Group } from '../../models/data.group.model';
import { AffinityUpdateDataModal } from '../affinity-data-modal/affinityUpdateDataModal';
import { AffinityInsertDataModal } from '../affinity-data-modal/affinityInsertDataModal';
import { SettingContext } from '../../contexts/setting.context';
import { AffinitySettingModal } from '../affinity-data-modal/affinitySettingModal';

const Tooltip = ({ x, y, info }) => (
  <foreignObject x={x + 10} y={y + 10} width={100} height={80}>
    <div className="tooltip-title">
    	Group: {info.data.group.name}
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


function Scatter() {
	const [showTooltip, setShowTooltip] = useState<{data:Data, show:Boolean}>({data:{kd:0,ka:0,KD:0, group:{name: "default", color:"#000000"}}, show:false});
	const { data, setData } = useContext(DataContext);
	const { setting } = useContext(SettingContext);
	const [ curData, setCurData ] = useState<Data>(new Data());
	const [ allGroups, setAllGroups] = useState<Group[]>([{name: 'default', color: '#000000'}]);
	const [showInsertModal, setShowInsertModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showSettingModal, setShowSettingModal] = useState(false);

	useEffect(()=>{
		let set = new Set();
		let result = Array<Group>()
		data.forEach(d=>{
			if(!set.has(d.group.name))
				set.add(d.group.name);
				result.push(d.group);
		});
		console.log(result);
		setAllGroups(result);
	}, [data]);
	var colors = scaleOrdinal()
    .domain(allGroups.map((group)=>group.name))
    .range(allGroups.map((group)=>group.color))
	//const xMinAndMax =extent<number>(data.map((d:Data)=>{return Math.log(d.kd)/Math.log(10)}))
	//const xDomain=[xMinAndMax[0]!, xMinAndMax[1]!]
	const xDomain = setting.kdTick
	//const yMinAndMax =extent<number>(data.map((d:Data)=>{return Math.log(d.ka)/Math.log(10)}))
	//const yDomain=[yMinAndMax[0]!, yMinAndMax[1]!]
	const yDomain = setting.kaTick
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
	const handleSetting = () =>{
		setShowSettingModal(true);
	};
	const handleUpdate = (data: Data) =>{
		setCurData(data);
		setShowUpdateModal(true);
	};
    const handleInsert = () => {
		setShowInsertModal(true);
	};


	const circles = data.map((d, i) => (
		<circle key={i} r={5} className="data-circle" cx={xScale(Math.log(d.kd)/Math.log(10))} cy={yScale(Math.log(d.ka)/Math.log(10))} 
		fill={colors(d.group.color) as string}
		onClick={() =>handleUpdate(d)}
		onMouseOver={()=> setShowTooltip({data:d,show:true})}
		onMouseOut={() => setShowTooltip({data:d,show:false})} />
	))

	const Tooltips = <Tooltip
		x={xScale(Math.log(showTooltip?.data.kd!)/Math.log(10))}
		y={yScale(Math.log(showTooltip?.data.ka!)/Math.log(10))}
		info={showTooltip}
  	/>
	return (
		<div className='container-fluid mw-1200 py-4 px-5'>
			<div className='row' >
			<svg id='scatter-plot' width={w} height={h}>
				<g transform={`translate(${margin.left},${margin.top})`} >
					<AxisLeft yScale={yScale.nice()} width={width} height={height}/>
					<AxisBottom xScale={xScale.nice()} width={width} height={height} />
					<AxisKD xScale={xScale.nice()} yScale={yScale.nice()} width={width} tickArr={setting.KDAxis} />
					{circles}
					{showTooltip?.show&&Tooltips}
				</g>
				<Legend groups={allGroups} width={width}></Legend>
			</svg>
			</div>
			
			
			<div className='row mt-3'>
				<div className='col-2'>
					<Button variant="contained" color="primary" onClick={handleSetting}>基本設定</Button>
				</div>
				<div className='col-2'>
					<Button variant="contained" color="primary" onClick={handleInsert}>新增資料</Button>
				</div>
				<div className='col-2'>
					<Button variant="contained" onClick={handleDownload}>下載資料</Button>
				</div>
			</div>
			<AffinitySettingModal show={showSettingModal} onClose={() => setShowSettingModal(false)}></AffinitySettingModal>
			<AffinityUpdateDataModal show={showUpdateModal} data={curData} onClose={() => setShowUpdateModal(false)}></AffinityUpdateDataModal>
			<AffinityInsertDataModal show={showInsertModal} onClose={() => setShowInsertModal(false)}></AffinityInsertDataModal>
		</div>
	);
}

export default Scatter;
