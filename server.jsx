'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var resolveHash = require('when/keys').all;

var resources = require("./resources");
var routes = require('./routes.jsx');
var Html   = require('./components/Html.jsx');

module.exports = function (req, res, next) {
	Router.run(routes, req.url, function (Handler, state) {
		var title  = DocumentTitle.rewind();

		resolveHash(resources.load(state.routes, state.params)).then(function(data) {
			var markup = React.renderToString(<Handler data={data} />);
			var html   = React.renderToStaticMarkup(<Html title={title} markup={markup} />);
			res.send('<!DOCTYPE html>' + html);
		});
	});
};

