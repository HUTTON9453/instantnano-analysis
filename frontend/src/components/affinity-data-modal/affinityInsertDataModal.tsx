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
import cloneDeep from 'lodash/cloneDeep';

type AffinityInsertDataProps = {
	show: boolean;
	onClose: () => void;
};

export const AffinityInsertDataModal: FunctionComponent<AffinityInsertDataProps> = (props) => {
	const { insertData } = useContext(DataContext);
	const [ curData, setCurData ] = useState<Data>(new Data());
	const [ color, setColor] = useState("#000000");
	const handleInsert = (curData :Data) => {		
		insertData(cloneDeep(curData));
		props.onClose();
	}
	return (
		<Dialog open={props.show} onClose={props.onClose}>
			<DialogTitle>Insert Data Point</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Insert the data point.
				</DialogContentText>
				<div className="row">
					<div className="col-3">
						<TextField label="ka" variant="outlined" onChange={(event)=>{ curData.ka = event.target.value as unknown as number; setCurData(curData); }}/>
					</div>
					<div className="col-3">
                        <TextField label="kd" variant="outlined" onChange={(event)=>{ curData.kd = event.target.value as unknown as number; setCurData(curData); }}/>
					</div>
					<div className="col-3">
                        <TextField label="KD" variant="outlined" onChange={(event)=>{ curData.KD = event.target.value as unknown as number; setCurData(curData); }}/>
					</div>
					
                </div>
                <div className="row mt-2">
					<div  className="col-3">
                    	<TextField label="Group" variant="outlined" onChange={(event)=>{curData.group.name=event.target.value as unknown as string; setCurData(curData);}}/>
                	</div>
                    <div className="col-auto">
                        <CompactPicker
                            color={color}
                            onChange={color=>{setColor(color['hex']); curData.group.color=color['hex']; setCurData(curData);}}
                        />
					</div>
                </div>
			</DialogContent>
			<DialogActions>
				<Button onClick={()=>handleInsert(curData)} color="primary">
					儲存
				</Button>
				<Button onClick={props.onClose} color="primary">
					取消
				</Button>
			</DialogActions>
		</Dialog>
	);
};
