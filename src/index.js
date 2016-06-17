import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Treeful from 'treeful';
import Sheet from './sheet';

class App extends Component {
	constructor () {
		super();
		this.state = {
			projects: []
		};
		let sheet = new Sheet();
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
			<div className='projects'>
				{this.state.projects.map((project, index) => <p key={index}>{project.join(', ')}</p>)}
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));