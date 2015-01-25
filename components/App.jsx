"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var data  = require('../public/data/places');
var title = "Some places in Italy";

var App = React.createClass({

  getDefaultProps: function () {
    return { places: data };
  },

  render: function () {
    var links = this.props.places.map(function (place) {
      return (
        <li key={"place-" + place.id}>
          <Link to="place" params={{ id: place.id }}>{place.name}</Link>
        </li>
      );
    });
    return (
      <DocumentTitle title={ title }>
        <div className="app">
          <h1>{ title }</h1>
          <ul className="master">
            { links }
            <li><Link to="product" params={{id: 1}}>Product 1</Link></li>
            <li><Link to="product" params={{id: 2}}>Product 2</Link></li>
            <li><Link to="index"><small>(back to index)</small></Link></li>
          </ul>
          <div className="detail">
            <RouteHandler data={this.props.data} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;