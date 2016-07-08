/*
  Inventory
*/

import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://catch-of-the-day-753b1.firebaseio.com');

@autobind
class Inventory extends React.Component {

  constructor() {
    super();

    this.state = {
      uid : ''
    }
  }

  authenticate(provider) {
    console.log('trying to auth with ' + provider );
    ref.authWithOAuthPopup(provider, function(err, authData) {
      console.log(authData);
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In with Github</button>
        <button className="twitter" onClick={this.authenticate.bind(this, 'twitter')}>Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    var linkState = this.props.linkState;
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.' + key + '.name')}ref="name" />
        <input type="text" ref="price" valueLink={linkState('fishes.' + key + '.price')} />
        <select ref="status" valueLink={linkState('fishes.' + key + '.status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" ref="desc" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" ref="image" valueLink={linkState('fishes.' + key + '.image')} />
        <button type="submit" onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    )
  }

  render() {

    let logoutButton = <button>Log Out!</button>

    // first check if they are logged in
    if(!this.state.uid) {
      return (
        <div>
          { this.renderLogin() }
        </div>
      )
    }

    // then check if they aren't the owner
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry, you aren't the owner of this store</p>
          {logoutButton}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm { ...this.props } />

        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )

  }

};

Inventory.propTypes = {
  addFish : React.PropTypes.func.isRequired,
  loadSamples : React.PropTypes.func.isRequired,
  fishes : React.PropTypes.object.isRequired,
  linkState : React.PropTypes.func.isRequired,
  removeFish : React.PropTypes.func.isRequired
};

export default Inventory;
