import React, { FunctionComponent } from 'react';
import './App.css';
import { AffinityAbilityAnalysis } from './component/affinity-ability-analysis/affinityAbilityAnalysis';

export const App: FunctionComponent = () => {
	return (
		<div className="my-app">
			<AffinityAbilityAnalysis data={[ 1, 2, 3 ]} />
		</div>
	);
};
