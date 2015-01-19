"use strict";

module.exports.load = function(routes, params) {
	return routes.filter(function (route) {
		// gather up the handlers that have a static `fetchData` method
		return route.handler.fetchData;
	}).reduce(function (promises, route) {
		// reduce to a hash of `key:promise`
		promises[route.name] = route.handler.fetchData(params);
		return promises;
	}, {});
};
