import React from 'react';
import ProductItems from './ProductItems';
import axios from 'axios';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'data/db.json',
			products: null,
			currentPage:1,
			productsPerPage:6
    };
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    // console.log(res);
    this.setState({ products: res.data });
  }

  render() {

		

    return (
      <React.Fragment>
        {this.state.products ? (
          <div>
            {this.state.products.map(product => (
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
