import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Treeful from 'treeful';

import './index.scss';
import Sheet from './sheet';
import Card from './components/card';

class App extends Component {
	constructor () {
		super();
		this.state = {
			projects: []
		};
		const sheet = new Sheet();
		sheet.loadScript('https://apis.google.com/js/client.js');
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('projects', this.updateData.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	updateData(projects) {
		this.setState({ projects });
	}

	render() {
		return (
			<div className='app'>
				{this.state.projects.map((project, index) => <Card key={index} project={project} />)}
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));