import React, { FunctionComponent } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import Scatter from './components/affinity-ability-analysis/scatter';
import { Header } from './components/header/header';
import { DataProvider } from './contexts/data.context';
import { SettingProvider } from './contexts/setting.context';
export const App: FunctionComponent = () => {
	return (
	<Router>
	<Header />
		<Switch>
		  <Route exact path="/" render={()=><SettingProvider><DataProvider><Scatter /></DataProvider></SettingProvider>} />
		</Switch>
	</Router>
	);
	
};
