import React from 'react';

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
      <div> 
			<h1>{this.state.id}</h1>
			<h2>	{this.state.name}	</h2>
			<h2>	{this.state.size}	</h2>
			<h2>	{this.state.colour}	</h2>
			
			<img src={`./images/${this.state.img}`} alt="logo" />
							
      </div>
    );
  }
}
