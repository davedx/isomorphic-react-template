'use strict';
var React = require('react');

// Handle the HTML rendering on the server
var Html = React.createClass({
render: function() {
  return (
      <html>
      <head>
        <title>{ this.props.title }</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="stylesheet" href="/css/main.css" />
        <script src="/js/lib.js"></script>
        <script src="/js/main.js"></script>
        <script src="https://cdn.firebase.com/js/client/2.1.1/firebase.js"></script>
      </head>
      <body dangerouslySetInnerHTML={{__html: this.props.markup}}></body>
      </html>
  );
}
});

module.exports = Html;
