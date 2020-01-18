import React from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import ProductFilter from './ProductFilter';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'data/db.json',
      products: [],
      currentPage: 1,
      productsPerPage: 4,
      totalPages: 0,
			paginated: [],
			status:'ready'
    };

    this.pagination = this.pagination.bind(this);
    this.tick = this.tick.bind(this);
    this.status = this.status.bind(this);
    this.totalPageCount = this.totalPageCount.bind(this);
	}
	
	async componentDidMount() {
    const res = await axios.get(this.state.url);
		this.setState({ products: res.data });
		this.totalPageCount(this.state.products)
    this.pagination();
		this.tick();
	}
	
	componentDidUnmount() {
    clearInterval(this.tick);
  }

	totalPageCount(products){
		const { productsPerPage } = this.state;
		let pageCount = products.length / productsPerPage;
		this.setState({ totalPages: pageCount });
	}

  pagination() {
		
		const { products, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
		);
    this.setState({ paginated: currentProducts });
  }

  tick() {
    setInterval(() => {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
      if (this.state.currentPage > this.state.totalPages) {
        this.setState({ currentPage: 1 });
      }
      this.pagination();
    }, 10000);
	}
	
	status(event){
		const { productsPerPage } = this.state;
	
		if(event.target.id === 'ready'){
			let filtered = this.state.products.filter(product => product.status.includes(this.state.status));
			// let pageCount = filtered.length / productsPerPage;
			this.setState({products:filtered });
			this.totalPageCount(filtered);
			// console.log(pageCount)

		}	
		
		this.pagination();
	}

	render() {
    return (
      <React.Fragment>
        {this.state.paginated ? (
          <div>
            {/* {this.state.paginated.filter(product => product.status.includes(this.state.status)).map((product, index) => ( */}
            {this.state.paginated.map((product) => (
              <ProductItems
                key={product.id}
                id={product.id}
                name={product.product_name}
                category={product.category}
                size={product.size}
                colour={product.colour}
                status={product.status}
                initial={product.customer_initial}
                img={product.product_image}
              />
            ))}
          </div>
        ) : (
          <h4>Loading...</h4>
				)}
				
			<ProductFilter status={this.status}/>

      </React.Fragment>

    );
  }
}

export default ProductList;
