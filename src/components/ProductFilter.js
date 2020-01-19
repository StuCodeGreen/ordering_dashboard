import React from 'react';
import './ProductFilter.css';

export default class ProductFilter extends React.Component {


	render(){
		const {status} = this.props;

		return (
			<div className="filter">
			<input type="button" id="all" onClick={status}/>
			<label htmlFor="all">all</label>

			<input type="button" id="ready" onClick={status}/>
			<label htmlFor="ready">ready to try</label>

			<input type="button" id="onTheWay" onClick={status}/>
			<label htmlFor="onTheWay">on the way</label>

			<input type="button" id="queue" onClick={status}/>
			<label htmlFor="queue">in the queue</label>

			<input type="button" id="outOfStock" onClick={status}/>
			<label htmlFor="outOfStock">out of stock</label>

			</div>
			)
	}

	}
