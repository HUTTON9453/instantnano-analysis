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
import { SettingContext } from '../../contexts/setting.context';
import { Setting } from '../../models/setting.model';

type AffinitySettingProps = {
	show: boolean;
	onClose: () => void;
};

export const AffinitySettingModal: FunctionComponent<AffinitySettingProps> = (props) => {
	const { setting, updateSetting } = useContext(SettingContext);
	const [ curSetting, setCurSetting ] = useState<Setting>(setting);

	const handleSetting = ()=>{
		updateSetting(curSetting);
		props.onClose();
	}
	return (
		<Dialog open={props.show} onClose={props.onClose}>
			<DialogTitle>Update Setting</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please enter integer type for ka and kd. Use commas to separate integer for KD Axis.
				</DialogContentText>
				<div className="row">
					<div className="col-3">
						<TextField label="ka min" defaultValue={curSetting.kaTick[0]}  variant="outlined" 
						onChange={(event)=>{ curSetting.kaTick[0] = event.target.value as unknown as number; setCurSetting(curSetting); }}/>
					</div>
					<div className="col-3">
						<TextField label="ka max" defaultValue={curSetting.kaTick[1]}  variant="outlined"
						onChange={(event)=>{ curSetting.kaTick[1] = event.target.value as unknown as number; setCurSetting(curSetting); }}/>
					</div>
					<div className="col-3">
						<TextField label="kd min" defaultValue={curSetting.kdTick[0]}  variant="outlined"
						onChange={(event)=>{ curSetting.kdTick[0] = event.target.value as unknown as number; setCurSetting(curSetting); }}/>
					</div>
					<div className="col-3">
						<TextField label="kd max" defaultValue={curSetting.kdTick[1]}  variant="outlined"
						onChange={(event)=>{ curSetting.kdTick[1] = event.target.value as unknown as number; setCurSetting(curSetting); }}/>
					</div>
                </div>
				<div className="row mt-3">
					<div className="col-6">
						<TextField label="KD" defaultValue={curSetting.KDAxis} variant="outlined"
						onChange={(event)=>{ curSetting.KDAxis = event.target.value.split(',') as unknown as Array<number>; setCurSetting(curSetting); }}/>
					</div>
					
                </div>
               
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSetting} color="primary">
					儲存
				</Button>
				<Button onClick={props.onClose} color="primary">
					取消
				</Button>
			</DialogActions>
		</Dialog>
	);
};
