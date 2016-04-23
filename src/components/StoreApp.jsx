import React from 'react';

export default class StoreApp extends React.Component {
  getItems() {
    return this.props.apps || [];
  }
  render() {
    return <div>
    <section className="storeapp">
    <section className="main">
    <ul className="app-list">
    {this.getItems().map(item =>
      <li className="active" key={item.get('text')}>
      <div className="view">

      <label htmlFor="app">
      {item.get('text')}
      </label>

      <form action="" method="POST">
      <script
      src="https://checkout.stripe.com/checkout.js" class="stripe-button"
      data-key="pk_test_3M8vPHIpWsqjAHs64gK5YB2g"
      data-amount="999"
      data-name="Demo Site"
      data-description="Widget"
      data-image="/img/documentation/checkout/marketplace.png"
      data-locale="auto">
      </script>
      </form>

      </div>
      </li>
    )}
    </ul>
    </section>
    </section>
    </div>
  }
};
