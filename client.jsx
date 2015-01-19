/* global document */
"use strict";

var React  = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');
var resolveHash = require('when/keys').all;
var resources = require("./resources");

document.addEventListener("DOMContentLoaded", function(event) {
	Router.run(routes, Router.HistoryLocation, function (Handler, state) {
		//TODO: Figure out if this is a new client-side route that genuinely needs
		//to load its resources, or if it's the first client load on a server-side
		//response.
		resolveHash(resources.load(state.routes, state.params)).then(function(data) {
			React.render(<Handler data={data} />, document.body);
		});
	});
});
