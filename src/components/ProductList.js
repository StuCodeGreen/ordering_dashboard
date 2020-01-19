import React from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import ProductFilter from './ProductFilter';
import ProductPagination from './ProductPagination';
import './ProductList.css';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'data/db.json',
      data: [],
      products: [],
      paginated: [],
      currentPage: 1,
      productsPerPage: 4,
      totalPages: 0
    };

    this.pagination = this.pagination.bind(this);
    this.tick = this.tick.bind(this);
    this.status = this.status.bind(this);
    this.totalPageCount = this.totalPageCount.bind(this);
    this.selectedPage = this.selectedPage.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ products: res.data, data: res.data });
    this.totalPageCount(this.state.products);
    this.pagination(this.state.products, this.state.currentPage);
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.tick);
  }

  totalPageCount(products) {
    const { productsPerPage } = this.state;
    let pageCount = Math.round(products.length / productsPerPage);
    this.setState({ totalPages: pageCount });
  }

  pagination(products, currentPage) {
    const { productsPerPage } = this.state;
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
			
      let counter = this.state.currentPage;
      counter++;
      if (this.state.currentPage >= this.state.totalPages) {
        counter = 1;
			}
			this.pageIndication(counter);
      this.setState({ currentPage: counter });
      this.pagination(this.state.products, this.state.currentPage);
    }, 10000);
  }

	pageIndication(event){
		let span = document.querySelectorAll(".pages");
		let element = document.getElementById(event);
		for (var i = 0; i < span.length; i++) {
			span[i].classList.remove('active');
	 	}
		element.classList.add("active");
	}

  selectedPage(event) {
		this.pageIndication(event.target.id)
	
    this.setState({ currentPage: Number(event.target.id) });
    this.pagination(this.state.products, Number(event.target.id));
    console.log(this.state.products);
  }

  filter(status) {
    if (status === 'all') {
      this.pagination(this.state.data, 1);
      this.totalPageCount(this.state.data);
      this.setState({ products: this.state.data });
    } else {
      let filtered = this.state.data.filter(product =>
        product.status.includes(status)
      );
      this.totalPageCount(filtered);
      this.pagination(filtered, 1);
      this.setState({ products: filtered });
    }
  }

  status(event) {
    if (event.target.id === 'all') {
      this.filter(event.target.id);
    }
    if (event.target.id === 'ready') {
      this.filter(event.target.id);
    }
    if (event.target.id === 'onTheWay') {
      this.filter(event.target.id);
    }
    if (event.target.id === 'queue') {
      this.filter(event.target.id);
    }
    if (event.target.id === 'outOfStock') {
      this.filter(event.target.id);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.paginated ? (
          <div className="dashboard">
				
            <ProductFilter status={this.status} />
						<div className="products">   {this.state.paginated.map(product => (
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
            ))}</div>
            <ProductPagination
							currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              selectedPage={this.selectedPage}
            />
          </div>
        ) : (
          <h4>Loading...</h4>
        )}
      </React.Fragment>
    );
  }
}

export default ProductList;
