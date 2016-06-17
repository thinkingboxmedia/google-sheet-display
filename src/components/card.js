import React, { Component } from 'react';
import Treeful from 'treeful';

export default class Card extends Component {
	render() {
		return (
			<div className='card'>
				<h3>{this.props.project.title}</h3>
				<p>{this.props.project.due}</p>
				<p>{this.props.project.devs}</p>
			</div>
		);
	}
}