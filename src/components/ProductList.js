import React from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import ProductFilter from './ProductFilter';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			url: 'data/db.json',
			data:[],
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
		this.setState({ products: res.data, data: res.data });
		this.totalPageCount(this.state.products);
    this.pagination(this.state.products);
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

  pagination(products) {
		
		const { currentPage, productsPerPage } = this.state;
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
      this.pagination(this.state.products);
    }, 10000);
	}

	filter(status){
		
		let filtered = this.state.data.filter(product => product.status.includes(status));
		this.setState({products:filtered });
		this.totalPageCount(filtered);
		this.pagination(filtered);
		this.setState({ currentPage: 1 });
	}
	
	status(event){
	
		if(event.target.id === 'ready'){
			this.setState({products:this.state.data});
			this.filter(event.target.id);
		}	
		if(event.target.id === 'onTheWay'){
			this.setState({products:this.state.data});
			this.filter(event.target.id);
		}	
		if(event.target.id === 'queue'){
			this.filter(event.target.id);
		}	
		if(event.target.id === 'outOfStock'){
			this.filter(event.target.id);
		}	
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
