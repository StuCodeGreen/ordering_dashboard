import React, { useEffect, useReducer } from 'react';
import ProductItems from './components/ProductItems';
import ProductFilter from './components/ProductFilter';
import ProductPagination from './components/ProductPagination';
import './components/ProductList.css';
import API from './API';

function App() {
  function fetchData() {
    API.get('products').then(({ data }) => {
      setState({ products: data.products });
      setState({ data: data.products });
    });
  }

  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    url: ['db/db.json'],
    data: [],
    products: [],
    paginated: [],
    currentPage: 1,
    productsPerPage: 4,
    totalPages: 0,
  });

  const totalPageCount = (products) => {
    setState({
      totalPages: Math.round(products.length / state.productsPerPage),
    });
  };

  const pagination = (products, currentPage) => {
    const indexOfLastProduct = currentPage * state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - state.productsPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setState({ paginated: currentProducts });
  };

  const pageIndication = (event) => {
    let span = document.querySelectorAll('.pages');
    let element = document.getElementById(event);
    for (var i = 0; i < span.length; i++) {
      span[i].classList.remove('active');
    }
    element.classList.add('active');
  };

  const selectedPage = (event) => {
    pageIndication(event.target.id);
    setState({ currentPage: Number(event.target.id) });
    pagination(state.products, Number(event.target.id));
  };

  const filter = (status) => {
    if (status === 'all') {
      setState({ products: state.data });
      pagination(state.data, 1);
      totalPageCount(state.data);
    } else {
      let filtered = state.data.filter((product) =>
        product.product_status.includes(status)
      );
      setState({ products: filtered });
      setState({ currentPage: 1 });
      totalPageCount(filtered);
      pagination(filtered, 1);
    }
  };

  const status = (event) => {
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
  };

  const tick = () => {
    const interval = setInterval(() => {
      let counter = state.currentPage;
      counter++;
      if (state.currentPage >= state.totalPages) {
        counter = 1;
      }
      pageIndication(counter);

      setState({ currentPage: counter });
      pagination(state.products, state.currentPage);
    }, 10000);
    return interval;
  };

  function isLoaded(data) {
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    totalPageCount(state.products);
    pagination(state.products, state.currentPage);
    const interval = tick();
    console.log('useEffect 2');
    return () => {
      clearTimeout(interval);
    };
  }, [state.products, state.currentPage]);

  return isLoaded(state.data) ? (
    <div className="dashboard">
      <ProductFilter status={status} />
      <div className="products">
        {state.paginated.map((product) => (
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
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        selectedPage={selectedPage}
      />
    </div>
  ) : (
    <h1 style={{ color: '#fff', textAlign: 'center' }}> Loading... </h1>
  );
}

export default App;
