import React from 'react';
import { render } from '@testing-library/react';

export default class ProductFilter extends React.Component {


	render(){
		const {status} = this.props;

		return (
			<div>
	
			<button id="ready" onClick={status}>Ready to try</button>
			<button id="onTheWay" onClick={status}>On the way</button>
			<button id="queue" onClick={status}>in the queue</button>
			<button id="outOfStock" onClick={status}>out of stock</button>
	
			</div>
			)
	}

	}
