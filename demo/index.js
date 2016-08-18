import DDos from '../src/index.js';
import React, { Component } from 'react';
import { render } from 'react-dom';

const emojis = [
	{
		name: 'rage',
		count: 3
	},
	{
		name: 'blush',
		count: 1
	},
	{
		name: 100,
		count: 3
	},
	{
		name: 'grinning',
		count: 2
	}
];

class Testing extends Component {
	constructor() {
		super();
		this.state = {
	
		};
	}

	render() {
		return (
			<DDos />
		);
	}
}


render(<Testing />, document.getElementById('app'));

