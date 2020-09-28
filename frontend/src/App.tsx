import React, { FunctionComponent } from 'react';
import './App.css';
import Scatter from './component/affinity-ability-analysis/scatter';
import { DataProvider } from './context/data.context';
export const App: FunctionComponent = () => {
	return (
		<DataProvider>
			<div className="container-fluid mw-1200 py-4 px-5">
				<Scatter />
			</div>
		</DataProvider>
	);
};
