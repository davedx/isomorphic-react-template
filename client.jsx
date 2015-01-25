/* global document */
"use strict";

var React  = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');
var resolveHash = require('when/keys').all;
var resources = require("./resources");

document.addEventListener("DOMContentLoaded", function(event) {
	// load initial serialized data
	var pageDataJSON = {};
	try {
		var pageData = document.getElementById("page_data").innerHTML;
		pageDataJSON = JSON.parse(pageData);
	} catch (e) {
		console.error("Error: ", e);
	}

	Router.run(routes, Router.HistoryLocation, function (Handler, state) {
		// If this is initial client render, we need to get our
		// props from hydrated data embedded in html by server.
		if(pageDataJSON) {
			console.info("Rendering with hydrated data");
			// we must do this render even though the markup is present, so
			// all the react-router <Links /> and other frontend React hooks
			// are loaded.
			React.render(<Handler data={pageDataJSON} />, document.body);
			pageDataJSON = undefined;
		} else {
			// If no hydrated data, this is a fully client side
			// render, so async load the data we need from server.
			resolveHash(resources.load(state.routes, state.params)).then(function(data) {
				console.info("Rendering with server-loaded data");
				React.render(<Handler data={data} />, document.body);
			});
		}
	});
});
