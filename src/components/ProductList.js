import React from 'react';
import ProductItems from './ProductItems';
import axios from 'axios';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'data/db.json',
      products: [],
      currentPage: 1,
      productsPerPage: 4,
      totalPages: 0,
      paginated: []
    };

    this.pagination = this.pagination.bind(this);
    this.tick = this.tick.bind(this);
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

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    let pages = 0;
    for (var k in res) {
      if (res.hasOwnProperty(k)) {
        pages++;
      }
    }

    this.setState({ products: res.data, totalPages: pages });
    this.pagination();
    this.tick();
  }

  componentDidUnmount() {
    clearInterval(this.tick);
  }

	
  render() {
    return (
      <React.Fragment>
        {this.state.paginated ? (
          <div>
            {this.state.paginated.map((product, index) => (
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
      </React.Fragment>
    );
  }
}

export default ProductList;
