'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Promise 			= require("promise");
var Firebase 			= require("firebase");
var NotFound      = require('./NotFound.jsx');

var Product = React.createClass({
	statics: {
		fetchData: function (params) {
			return new Promise(function(res, rej) {
				//TEST FIREBASE ACCOUNT... OPEN TO THE WIDE WORLD FOR NOW...
				var ref = new Firebase("https://flickering-heat-6965.firebaseio.com/");
				ref.child("products/"+params.id).on("value", function(snapshot) {
					res(snapshot.val());
				}.bind(this));
			});
		}
	},

	render: function () {
		if(!this.props.data) {
			return <NotFound />;
		}

		return (
			<DocumentTitle title={ this.props.data.product.name }>
				<div className="place">
					<h2>{ this.props.data.product.name }</h2>
					<img src={this.props.data.product.picture}/>
				</div>
			</DocumentTitle>
		);
	}
});

module.exports = Product;
