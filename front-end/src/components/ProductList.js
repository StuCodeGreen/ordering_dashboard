import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import ProductFilter from './ProductFilter';
import ProductPagination from './ProductPagination';
import './ProductList.css';

function ProductList() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     url:
  //       'https://6hgqu0b2te.execute-api.eu-west-2.amazonaws.com/dev/products',
  //     data: [],
  //     products: [],
  //     paginated: [],
  //     currentPage: 1,
  //     productsPerPage: 4,
  //     totalPages: 0,
  //   };

  //   this.pagination = this.pagination.bind(this);
  //   this.tick = this.tick.bind(this);
  //   this.status = this.status.bind(this);
  //   this.totalPageCount = this.totalPageCount.bind(this);
  //   this.selectedPage = this.selectedPage.bind(this);
  // }

  const [url] = useState(
    'https://6hgqu0b2te.execute-api.eu-west-2.amazonaws.com/dev/products'
  );
  const [data, products, paginated] = useState([]);
  const [currentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [totalPages] = useState(0);

  // async componentDidMount() {
  //   const res = await axios.get(this.state.url);
  //   this.setState({
  //     products: res.data.products,
  //     data: res.data.products,
  //   });
  //   this.totalPageCount(this.state.products);
  //   this.pagination(this.state.products, this.state.currentPage);
  //   this.tick();
  // }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(url);
      products(res.data.products);
      // data(res.data.products);
    }
    fetchData();

    // this.setState({
    //   products: res.data.products,
    //   data: res.data.products,
    // });

    // data(res.data.products);

    // this.totalPageCount(products);
    // this.pagination(products, currentPage);
    // this.tick();

    return () => {
      clearInterval(this.tick);
    };
  }, []);
  // debugger;
  // totalPageCount(products) {
  //   const { productsPerPage } = this.state;
  //   let pageCount = Math.round(products.length / productsPerPage);
  //   this.setState({
  //     totalPages: pageCount,
  //   });
  // }

  // pagination(products, currentPage) {
  //   const { productsPerPage } = this.state;
  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const currentProducts = products.slice(
  //     indexOfFirstProduct,
  //     indexOfLastProduct
  //   );
  //   this.setState({
  //     paginated: currentProducts,
  //   });
  // }

  // tick() {
  //   setInterval(() => {
  //     let counter = this.state.currentPage;
  //     counter++;
  //     if (this.state.currentPage >= this.state.totalPages) {
  //       counter = 1;
  //     }
  //     this.pageIndication(counter);
  //     this.setState({
  //       currentPage: counter,
  //     });
  //     this.pagination(this.state.products, this.state.currentPage);
  //   }, 10000);
  // }

  // pageIndication(event) {
  //   let span = document.querySelectorAll('.pages');
  //   let element = document.getElementById(event);
  //   for (var i = 0; i < span.length; i++) {
  //     span[i].classList.remove('active');
  //   }
  //   element.classList.add('active');
  // }

  // selectedPage(event) {
  //   this.pageIndication(event.target.id);
  //   this.setState({
  //     currentPage: Number(event.target.id),
  //   });
  //   this.pagination(this.state.products, Number(event.target.id));
  // }

  // filter(status) {
  //   if (status === 'all') {
  //     this.pagination(this.state.data, 1);
  //     this.totalPageCount(this.state.data);
  //     this.setState({
  //       products: this.state.data,
  //     });
  //   } else {
  //     let filtered = this.state.data.filter((product) =>
  //       product.product_status.includes(status)
  //     );
  //     this.totalPageCount(filtered);
  //     this.pagination(filtered, 1);
  //     this.setState({
  //       products: filtered,
  //     });
  //   }
  // }

  // status(event) {
  //   if (event.target.id === 'all') {
  //     this.filter(event.target.id);
  //   }
  //   if (event.target.id === 'ready') {
  //     this.filter(event.target.id);
  //   }
  //   if (event.target.id === 'onTheWay') {
  //     this.filter(event.target.id);
  //   }
  //   if (event.target.id === 'queue') {
  //     this.filter(event.target.id);
  //   }
  //   if (event.target.id === 'outOfStock') {
  //     this.filter(event.target.id);
  //   }
  // }

  return (
    <React.Fragment>
      {/* {' '}
      {this.state.paginated ? (
        <div className="dashboard">
          <ProductFilter status={this.status} />{' '}
          <div className="products">
            {' '}
            {this.state.paginated.map((product) => (
              <ProductItems
                key={product.id}
                id={product.id}
                name={product.product_name}
                category={product.category}
                size={product.size}
                colour={product.colour}
                status={product.product_status}
                initial={product.customer_initial}
                img={product.product_image}
              />
            ))}{' '}
          </div>{' '}
          <ProductPagination
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            selectedPage={this.selectedPage}
          />{' '}
        </div>
      ) : (
        <h4> Loading... </h4>
      )}{' '} */}
    </React.Fragment>
  );
}

export default ProductList;
