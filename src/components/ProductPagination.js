import React from 'react';
import './ProductPagination.css';

export default class ProductPagination extends React.Component {

	render(){
		let {totalPages, selectedPage,currentPage} = this.props;
		const pages = [];
		for(let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}

		const renderPagesIndication = pages.map(page => (
			<span 
			 onClick={selectedPage}
			 key={page}
			 id={page} 
			 className="pages"
			 
			 >

			 </span>
		));

		return (
			<div  className="pagination">
				<div className="paginationItems">
				<div className="paginationDots">{renderPagesIndication}</div>
				<div className="numbers"><span>{currentPage}</span><span className="numbersSeparator"></span><span>{totalPages}</span></div>
			</div>
		
		
			</div>
			
		
		)
	}


}
