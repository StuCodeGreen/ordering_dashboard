import React from 'react';
import './ProductItems.css';

export default function ProductItems(props) {
  const { name, category, size, colour, status, initial, img } = props;

  return (
    <div className="productItem">
      <div className={`status ${status}`}></div>
      <div className="firstColumn">
        <img src={`./images/${img}`} alt="logo" width="100" height="100" />
        <h2 className="productName">{name}</h2>
      </div>
      <div className="columns">
        <h2>Category:</h2>
        <h2>{category}</h2>
      </div>
      <div className="columns">
        <h2>Size:</h2>
        <h2>{size} </h2>
      </div>
      <div className="columns">
        <h2>Colour:</h2>
        <h2>{colour} </h2>
      </div>
      <div className="lastColumn">
        <h2> {initial} </h2>
      </div>
    </div>
  );
}
