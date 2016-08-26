import DDos from '../src/index.js';
import React, { Component } from 'react';
import { render } from 'react-dom';

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

