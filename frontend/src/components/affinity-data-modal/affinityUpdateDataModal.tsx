import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from '@material-ui/core';
import React, { FunctionComponent, useState, useContext } from 'react';
import { Data } from '../../models/data.model';
import { CompactPicker } from 'react-color'
import { DataContext } from '../../contexts/data.context';

type AffinityUpdateDataProps = {
	show: boolean;
	data: Data;
	onClose: () => void;
};

export const AffinityUpdateDataModal: FunctionComponent<AffinityUpdateDataProps> = (props) => {
	const { updateData } = useContext(DataContext);
	const [ color, setColor] = useState(props.data.group.color);
	const handleUpdate = () => {
		updateData(props.data);
		props.onClose();
	}
	const handleKa = (event)=>{
		props.data.ka=event.target.value as unknown as number;
	}
	const handleKd = (event)=>{
		props.data.kd=event.target.value as unknown as number;
	}
	const handleKD = (event)=>{
		props.data.KD=event.target.value as unknown as number;
	}
	const handleGroup = (event)=>{
		props.data.group.name=event.target.value as unknown as string;
	}
	const handleColor = (color) => {
		setColor(color['hex']); 
		props.data.group.color=color['hex']; 
	}
	return (
		<Dialog open={props.show} onClose={props.onClose}>
			<DialogTitle>Update Data Point</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Update the group and color of the data point.
				</DialogContentText>
				<div className="row">
					<div className="col-3">
						<TextField label="ka" variant="outlined" defaultValue={props.data.ka}  onChange={handleKa}/>
					</div>
					<div className="col-3">
                        <TextField label="kd" variant="outlined" defaultValue={props.data.kd}   onChange={handleKd}/>
					</div>
					<div className="col-3">
                        <TextField label="KD" variant="outlined" defaultValue={props.data.KD}   onChange={handleKD}/>
					</div>
					
                </div>
                <div className="row mt-2">
					<div  className="col-3">
                    	<TextField label="Group" variant="outlined" defaultValue={props.data.group.name} onChange={handleGroup}/>
                	</div>
					<div className="col-auto">
                        <CompactPicker
                            color={color}
                            onChange={handleColor}
                        />
					</div>
                </div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleUpdate} color="primary">
					儲存
				</Button>
				<Button onClick={props.onClose} color="primary">
					取消
				</Button>
			</DialogActions>
		</Dialog>
	);
};
