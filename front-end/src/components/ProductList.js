import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import ProductFilter from './ProductFilter';
import ProductPagination from './ProductPagination';
import './ProductList.css';

function ProductList() {
  const [url] = useState(
    'https://6hgqu0b2te.execute-api.eu-west-2.amazonaws.com/dev/products'
    // 'db/db.json'
  );
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const totalPageCount = useCallback(
    (prod) => {
      let pageCount = Math.round(prod.length / productsPerPage);
      setTotalPages(pageCount);
    },
    [setTotalPages, productsPerPage]
  );

  const pagination = useCallback(
    (products, currentPage) => {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );

      setPaginated(currentProducts);
    },
    [setPaginated, productsPerPage]
  );

  const pageIndication = useCallback((page) => {
    let span = document.querySelectorAll('.pages');
    let element = document.getElementById(page);
    for (var i = 0; i < span.length; i++) {
      span[i].classList.remove('active');
    }
    element.classList.add('active');
  }, []);

  const selectedPage = useCallback(
    (event) => {
      pageIndication(event.target.id);

      setCurrentPage(Number(event.target.id));

      pagination(products, Number(event.target.id));
    },
    [pageIndication, setCurrentPage, pagination, products]
  );

  const filter = useCallback(
    (status) => {
      if (status === 'all') {
        setProducts(data);
        pagination(data, 1);
        totalPageCount(data);
      } else {
        let filtered = data.filter((product) =>
          product.product_status.includes(status)
        );
        setProducts(filtered);
        setCurrentPage(1);
        totalPageCount(filtered);
        pagination(filtered, 1);
      }
    },
    [pagination, data, totalPageCount, setProducts, setCurrentPage]
  );

  const status = useCallback(
    (event) => {
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
      pageIndication(1);
    },
    [filter, pageIndication]
  );

  const tick = useCallback(() => {
    const interval = setInterval(() => {
      let counter = currentPage;
      counter++;
      if (currentPage >= totalPages) {
        counter = 1;
      }
      pageIndication(counter);
      setCurrentPage(counter);
      pagination(products, counter);
    }, 10000);

    return interval;
  }, [
    products,
    currentPage,
    pageIndication,
    pagination,
    totalPages,
    setCurrentPage,
  ]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(url);
      setProducts(res.data.products);
      setData(res.data.products);
      pageIndication(currentPage);
    }

    fetchData();
  }, [url]);

  useEffect(() => {
    totalPageCount(products);
    pagination(products, currentPage);
    const interval = tick();

    return () => {
      clearTimeout(interval);
    };
  }, [totalPageCount, pagination, products, tick, currentPage]);

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
