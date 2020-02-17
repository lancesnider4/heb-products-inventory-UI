import React, { Component } from 'react';
import './App.css';
import Footer from './Footer.js';
import Header from './Header.js';
import BootstrapTable from 'react-bootstrap-table-next';

class App extends Component {

   constructor(props) {
     super(props);
     this.state = {
       showDepartments: true,
       products: [],
       columns: [{
         dataField: 'id',
         text: 'ID'
    }, {
         dataField: 'description',
         text: 'Description'
    }, {
         dataField: 'lastSold',
         text: 'Last Sold'
    }, {
         dataField: 'shelfLife',
         text: 'Shelf Life'
    }, {
         dataField: 'department',
         text: 'Department'
    }, {
         dataField: 'price',
         text: 'Price'
    }, {
         dataField: 'unit',
         text: 'Unit'
    }, {
         dataField: 'xFor',
         text: 'For'
    }, {
         dataField: 'cost',
         text: 'Cost'
    }
  ]
  };
     //Bind is necessary to pass data from text box/button
     this.handleChange = this.handleChange.bind(this);
     this.handleProductDepartmentSubmit = this.handleProductDepartmentSubmit.bind(this);
     this.handleAllSubmit = this.handleAllSubmit.bind(this);
     this.handleProductDescriptionSubmit = this.handleProductDescriptionSubmit.bind(this);
     this.handleProductIdSubmit = this.handleProductIdSubmit.bind(this);
   }

   componentDidMount() {
     const { products } = this.state;
     products.map(this.renderProducts)
   }

   //Render the products from the API call (heb-products-api-1.0)
   renderProducts = ({ id, description, lastSold, shelfLife, department, price, unit, xFor, cost}) =>
   <div key={id}> </div>

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleProductDepartmentSubmit = (event) => {

    //Set value from textbox to uppercase for data consistency
    const productDepartmentText = this.state.value.toUpperCase();
    var url = "http://localhost:8080/heb-products-api-1.0/v1/products/departments/" + productDepartmentText;

    //Invoke API call to retrieve product department
      fetch(url)
      .then(response =>
      {
        if(!response.ok)
        {
          alert ('Error ' + response.status + ' Please enter in a valid product department (alpha characters only).');
          this.setState({value: ''})
        }
        else
        {
            return response.json();
        }
      })
      .then(response =>
      {
        if(response.length > 0)
        {
          console.log(response.status);
          this.setState({ products: response})
          this.setState({ showTable: true })
        }
        else
        {
          alert ('Sorry, we currently do not have any ' + (productDepartmentText) + ' product departments in our inventory');
          this.setState({value: ''})
          this.setState({ showDepartments: false })
          this.setState({ showTable: false })
          this.setState({ showDescription: true })
        }
      })
      .catch(err => console.log(err.message))

    //Stops the default action of the event from happening (page would automatically refresh)
    event.preventDefault();
  }

  handleProductDescriptionSubmit = (event) => {

    //Set value from textbox to uppercase for data consistency
    const productDescriptionText = this.state.value.toUpperCase();
    var url = "http://localhost:8080/heb-products-api-1.0/v1/products/descriptions/" + productDescriptionText;

    //Invoke API call to retrieve entered product description
    fetch(url)
    .then(response =>
    {
      //If response is not a 200, throw an error
      if(!response.ok)
      {
        alert ('Error ' + response.status + ' Please enter in a valid product description (alpha characters only).');
        this.setState({value: ''})
      }
      else
      {
          return response.json();
      }
    })
    .then(response =>
    {
      //Check if response object from API call is not empty
      if(response.length > 0)
      {
        console.log(response.status);
        this.setState({ products: response})
        this.setState({ showTable: true })
      }
      else
      {
        alert ('Sorry, we currently do not have any ' + (productDescriptionText) + ' product descriptions in our inventory');
        this.setState({value: ''})
        this.setState({ showDepartments: false })
        this.setState({ showTable: false })
        this.setState({ showDescription: false })
      }
    })
    .catch(err => console.log(err.message))

    //Stops the default action of the event from happening (page would automatically refresh)
    event.preventDefault();
  }

  handleProductIdSubmit = (event) => {

    //Set value from textbox to uppercase for data consistency
    const productIdText = this.state.value.toUpperCase();
    var url = "http://localhost:8080/heb-products-api-1.0/v1/products/ids/" + productIdText;

    //Invoke API call to retrieve entered product ID
    fetch(url)
    .then(response =>
    {
      //If response is not a 200, throw an error
      if(!response.ok)
      {
        alert ('Error ' + response.status + ' Please enter in a valid product id (numeric values only).');
        this.setState({value: ''})
      }
      else
      {
          return response.json();
      }
    })
    .then(response =>
    {
      //Check if response object from API call is not empty
      if(response.length > 0)
      {
        console.log(response.status);
        this.setState({ products: response})
        this.setState({ showTable: true })
      }
      else
      {
        alert ('Sorry, we currently do not have any ' + (productIdText) + ' product IDs in our inventory.  Returning back to product department page...');
        this.setState({value: ''})
        this.setState({ showDepartments: true })
        this.setState({ showTable: false })
      }
    })
    .catch(err => console.log(err.message))

    //Stops the default action of the event from happening (page would automatically refresh)
    event.preventDefault();
  }

  handleAllSubmit = (event) => {

    //Set showTable variable to true here to display table data in render call
    this.setState({ showTable: true })

    //Invoke API call to retrieve all products
    fetch('http://localhost:8080/heb-products-api-1.0/v1/products')
    .then(response => response.json())
    .then(response => this.setState({ products: response}))
    .catch(err => console.log(err.message))

    event.preventDefault();
  }

  render() {

    return (
    <div className="App">

        <Header />
  {/*If showDepartments state returns true, we will fall into this block (showing the produce department question)*/}
        {this.state.showDepartments ?
        <form onSubmit={this.handleProductDepartmentSubmit}>
          <label>
            What type of product department are you looking for?
            <div className="App-search">
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <input type="submit" value="Search" />
            </div>
          </label>
        </form>

        :
        [
          (this.state.showDescription ?
            <form onSubmit={this.handleProductDescriptionSubmit}>
            {/*If showDepartments state returns false and showDescription returns true, we will fall into this block (showing the descirption question)*/}
                  <label>
                      What type of product description are you looking for?
                    <div className="App-search">
                      <input type="text" value={this.state.value} onChange={this.handleChange} />
                      <input type="submit" value="Search" />
                    </div>
                  </label>
                </form>
                :
                  <form onSubmit={this.handleProductIdSubmit}>
                  {/*If showDepartments state returns false and showDescription returns false, we will fall into this block (showing the ID question)*/}
                  <label>
                      What type of product ID are you looking for?
                    <div className="App-search">
                      <input type="text" value={this.state.value} onChange={this.handleChange} />
                      <input type="submit" value="Search" />
                    </div>
                  </label>
                </form>

              ),  null
          ]
        }

{/*Search all products button*/}
      <div className="App-search">
        <form onSubmit={this.handleAllSubmit}>
          <label>
              <input type="submit" value="Search all products" />
          </label>
        </form>
      </div>

{/*{Toggles to show the table data/columns from API}*/}
      {this.state.showTable ?
      <BootstrapTable
              keyField='id'
              data={ this.state.products }
              columns={ this.state.columns } />

              : null }

        <Footer />

    </div>

    );
  }
}

export default App;
