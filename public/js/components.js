/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/** @jsx React.DOM */

	var FoodSelection = React.createClass({displayName: "FoodSelection",
	    getInitialState: function() {
	      return this.props;
	    },
	    render: function() {
	      var instance = this.state;
	      return (React.createElement("div", {className: "col-md-12"}, 
	          React.createElement("ul", {className: "breadcrumb stater-text stater-text-uppercase stater-text-purple"}, 
	            instance.breadcrumbs.map(function (breadcrumb, i) {
	              if ((instance.breadcrumbs.length-1) == i) {
	                return (React.createElement("li", {className: "active"}, breadcrumb));
	              } else {
	                return (React.createElement("li", {onClick: instance.onClick}, breadcrumb));
	              }
	            })
	          )
	        ));
	    }

	});

	module.exports = FoodSelection;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @jsx React.DOM */

	// The above declaration must remain intact at the top of the script.
	var converter = new Showdown.converter();

	var Comment = React.createClass({displayName: "Comment",
	    render: function() {
	        console.log("........inside ?????? render.........")
	        var rawMarkup = converter.makeHtml(this.props.children.toString());
	        return (
	            React.createElement("tr", null, 
	                React.createElement("td", null, this.props.product), 
	                React.createElement("td", null, this.props.about), 
	                React.createElement("td", null, this.props.quantity), 
	                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
	            )
	            );
	    }
	});

	var Products = React.createClass({displayName: "Products",

	    loadProductsFromServer: function() {
	        $.ajax({
	            url: this.props.url,

	            dataType: 'json',

	            success: function(data) {
	                this.setState({data: data});
	            }.bind(this),

	            error: function(xhr, status, err) {
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)

	        });
	    },
	    getInitialState: function() {
	        return {data: []};
	    },
	    componentWillMount: function() {
	        this.loadProductsFromServer();
	        //setInterval(this.loadProductsFromServer, this.props.pollInterval);
	    },
	    render: function() {
	        console.log("........inside products render.........")
	        return (
	            React.createElement("div", {className: "container"}, 
	                React.createElement("div", {className: "panel panel-primary"}, 
	                    React.createElement("div", {className: "panel-heading"}, 
	                        React.createElement("h3", {className: "panel-title"}, "Products"), 
	                        React.createElement("div", {className: "pull-right"}, 
	                            React.createElement("span", {className: "clickable filter", "data-toggle": "tooltip", title: "Toggle table filter", "data-container": "body"}, 
	                                React.createElement("i", {className: "glyphicon glyphicon-filter"})
	                            )
	                        )
	                    ), 
	                    React.createElement("div", {className: "panel-body"}, 
	                    React.createElement("input", {type: "text", className: "form-control", id: "dev-table-filter", "data-action": "filter", "data-filters": "#dev-table", placeholder: "Filter Products"})
	                    ), 
	                    React.createElement(CommentList, {data: this.state.data})
	                )
	            )
	            );
	    }
	});

	var CommentList = React.createClass({displayName: "CommentList",
	    render: function() {
	        console.log("........inside comment list render.........")
	        var commentNodes = this.props.data.map(function(comment, index) {
	            //console.log("index = " + index + ", comment: " + comment);
	            return (
	                React.createElement(Comment, {key: index, about: comment.about, product: comment.product, quantity: comment.quantity}, comment.product)

	                );
	        });
	        return (
	            React.createElement("div", {className: "panel-body"}, 
	                React.createElement("table", {className: "table table-hover", id: "dev-table"}, 
	                    React.createElement("thead", null, 
	                        React.createElement("tr", null, 
	                            React.createElement("th", null, "Products"), 
	                            React.createElement("th", null, "Product Description"), 
	                            React.createElement("th", null, "Quantity")
	                        )
	                    ), 
	                    commentNodes
	                )
	            )
	            );
	    }
	});

	console.log("hello");

	React.renderComponent(
	    React.createElement(Products, {url: "/products", pollInterval: 2000}),
	    document.getElementById('content')
	);


/***/ }
/******/ ]);