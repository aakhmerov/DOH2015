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
