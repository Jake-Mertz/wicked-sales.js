import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart', { method: 'GET' })
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
    // console.log(this.state.cart);
  }

  addToCart(product) {
    const newState = this.state.cart.slice();
    // console.log(product);
    // console.log(this.state.cart);
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product })
    })
    // console.log(res)
      .then(res => res.json())
      .then(data => newState.push(data))
      .then(() => this.setState({ cart: newState }));
  }

  render() {
    // console.log(this.state.cart);
    // console.log(this.state.cart.length);
    let appView = null;
    if (this.state.view.name === 'catalog') {
      appView = <ProductList
        setView={this.setView}
      />;
    } else if (this.state.view.name === 'details') {
      appView = <ProductDetails
        details={this.state.view.params}
        setView={this.setView}
        addToCart={this.addToCart}
      />;
    } else if (this.state.view.name === 'cart') {
      appView = <CartSummary
        cartData={this.state.cart}
        setView={this.setView}
      />;
    }
    return (
      <div>
        <Header
          cartItemCount={this.state.cart.length}
          setView={this.setView}
        />
        {/* <ProductList view={this.setView()}/> */}
        {appView}
      </div>
    );
  }
}

export default App;
