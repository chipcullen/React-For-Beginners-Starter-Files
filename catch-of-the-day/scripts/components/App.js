/*
  App
*/

import React from 'react';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-753b1.firebaseio.com');

// Components
import Catalyst from 'react-catalyst'; // mixin
import Inventory from './Inventory';
import Fish from './Fish';
import Order from './Order';
import Header from './Header';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class App extends React.Component{

  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentDidMount() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context : this,
      state : 'fishes'
    });

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if(localStorageRef) {
      //update state
      this.setState({
        order : JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  addToOrder(key) {
    // updates the order to its current value plus one, or start with one
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order : this.state.order });
  }

  removeFromOrder(key) {
    delete this.state.order[key];
    this.setState({
      order : this.state.order
    });
  }

  addFish(fish) {
    var timestamp = (new Date()).getTime();
    // update state
    this.state.fishes['fish-' + timestamp] = fish;
    // set state
    this.setState({ fishes : this.state.fishes });
  }

  removeFish(key) {
    if(confirm("Are you sure you want to remove this fish?")) {
      this.state.fishes[key] = null;
      this.setState({
        fishes : this.state.fishes
      });
    }
  }

  loadSamples() {
    this.setState({
      fishes: require('../sample-fishes')
    });
  }

  renderFish (key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Chip is Cool" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>

        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish} />
      </div>
      )
  }
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
