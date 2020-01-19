import React from 'react';
import './ProductItems.css';

export default class ProductItems extends React.Component {

	state = {
		id:'',
		name:'',
		category:'',
		size:'',
		colour:'',
		status:'',
		initial:'',
		image:''
	}

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
			<img src={`./images/${this.state.img}`} alt="logo" width="100" />
			<h2>{this.state.name}</h2>
			<h1>Category:{this.state.category}</h1>
		
			<h2>	Size:{this.state.size}	</h2>
			<h2>	Colour:{this.state.colour}	</h2>
			<h2>	{this.state.initial}	</h2>

			
	
							
      </div>
    );
  }
}
