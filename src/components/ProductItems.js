import React from 'react';
import './ProductItems.css';

export default class ProductItems extends React.Component {
  state = {
    id: '',
    name: '',
    category: '',
    size: '',
    colour: '',
    status: '',
    initial: '',
    image: ''
  };

  async componentDidMount() {
    const {
      id,
      name,
      category,
      size,
      colour,
      status,
      initial,
      img
    } = this.props;

    this.setState({
      id,
      name,
      category,
      size,
      colour,
      status,
      initial,
      img
    });
  }

  render() {
    return (
      <div className="productItem">
        <div className={`status ${this.state.status}`}></div>
        <div className="firstColumn">
          <img
            src={`./images/${this.state.img}`}
            alt="logo"
            width="100"
            height="100"
          />
          <h2 className="productName">{this.state.name}</h2>
        </div>
        <div className="columns">
          <h2>Category:</h2>
          <h2>{this.state.category}</h2>
        </div>
        <div className="columns">
          <h2>Size:</h2>
          <h2>{this.state.size} </h2>
        </div>
        <div className="columns">
          <h2>Colour:</h2>
          <h2>{this.state.colour} </h2>
        </div>
        <div className="lastColumn">
          <h2> {this.state.initial} </h2>
        </div>
      </div>
    );
  }
}
