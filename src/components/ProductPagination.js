import React from 'react';

export default class ProductPagination extends React.Component {

	render(){
		let {pages} = this.props;
		// const pageNumbers = [];
		// for(let i = 1; i <= pages; i++) {
		// 	pageNumbers.push(i);
		// }
		// console.log(pageNumbers);
		return (
			<div>
				<h1>{pages}</h1>
			</div>
		
		)
	}


}
