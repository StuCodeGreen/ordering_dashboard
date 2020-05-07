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
    // 'https://6hgqu0b2te.execute-api.eu-west-2.amazonaws.com/dev/products'
    'db/db.json'
  );
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
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
      setProducts(res.data.products);
      setData(res.data.products);

      // tick();
    }

    fetchData();

    // totalPageCount(products);
    // pagination(products, currentPage);

    // this.setState({
    //   products: res.data.products,
    //   data: res.data.products,
    // });

    return () => {
      // clearInterval(tick);
    };
    // currentPage, pagination, products, tick, totalPageCount, url
  }, []);

  function totalPageCount(products) {
    let pageCount = Math.round(products.length / productsPerPage);
    setTotalPages(pageCount);
  }

  // function totalPageCount(products) {
  //   const { productsPerPage } = this.state;
  //   let pageCount = Math.round(products.length / productsPerPage);
  //   this.setState({
  //     totalPages: pageCount,
  //   });
  // }

  function pagination(products, currentPage) {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setPaginated(currentProducts);
  }
  // function pagination(products, currentPage) {
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

  function tick() {
    // if (products.length < 1) {
    //   return false;
    // }
    setInterval(() => {
      let counter = currentPage;
      counter++;
      if (currentPage >= totalPages) {
        counter = 1;
      }
      pageIndication(counter);

      setCurrentPage(counter);
      pagination(products, currentPage);
    }, 10000);
  }

  function pageIndication(event) {
    let span = document.querySelectorAll('.pages');
    let element = document.getElementById(event);
    for (var i = 0; i < span.length; i++) {
      span[i].classList.remove('active');
    }
    element.classList.add('active');
  }

  function selectedPage(event) {
    pageIndication(event.target.id);

    setCurrentPage(Number(event.target.id));

    pagination(products, Number(event.target.id));
  }

  function filter(status) {
    if (status === 'all') {
      pagination(data, 1);
      totalPageCount(data);
      setProducts(data);
    } else {
      let filtered = data.filter((product) =>
        product.product_status.includes(status)
      );
      totalPageCount(filtered);
      pagination(filtered, 1);

      setProducts(filtered);
    }
  }

  function status(event) {
    if (event.target.id === 'all') {
      filter(event.target.id);
    }
    if (event.target.id === 'ready') {
      filter(event.target.id);
    }
    if (event.target.id === 'onTheWay') {
      filter(event.target.id);
    }
    if (event.target.id === 'queue') {
      filter(event.target.id);
    }
    if (event.target.id === 'outOfStock') {
      filter(event.target.id);
    }
  }

  return (
    <React.Fragment>
      {paginated ? (
        <div className="dashboard">
          <ProductFilter status={status} />
          <div className="products">
            {paginated.map((product) => (
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
            ))}
          </div>
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            selectedPage={selectedPage}
          />
        </div>
      ) : (
        <h4> Loading... </h4>
      )}
    </React.Fragment>
  );
}

export default ProductList;
