/*
  Inventory
*/

import React from 'react';
import AddFishForm from './AddFishForm';

var Inventory = React.createClass({
  renderInventory : function(key){
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
  },
  render: function(){
    return (
      <div>
        <h2>Inventory</h2>

        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm { ...this.props } />

        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>

      )
  },
  propTypes : {
    addFish : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    linkState : React.PropTypes.func.isRequired,
    removeFish : React.PropTypes.func.isRequired
 }
});

export default Inventory;
