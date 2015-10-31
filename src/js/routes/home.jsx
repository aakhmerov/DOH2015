var ReactDOM = require('react-dom');

var Header = require('./../modules/header.jsx');
var Breadcrumb = require('./../modules/breadcrumb.jsx');
var Tree = require('./../modules/tree.jsx');
var Branch = require('./../modules/branch.jsx');
var Login = require('./../modules/login.jsx');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var Homepage = React.createClass({

        getInitialState: function() {
            return {
                trees: [],
                user: '',
                currentState: 'trees',
                breadcrumbs: ['Overzicht']
            };
        },

        componentDidMount: function() {
            jQuery.get(this.props.treeSource, function(result) {
                if (this.isMounted()) {
                    this.setState({trees: result});
                }
            }.bind(this));

            jQuery.get(this.props.userSource, function(result) {
                if(!result.error) {
                    if (this.isMounted()) {
                        this.state.user = result['username'];
                        this.setState(this.state);
                    }
                }
            }.bind(this));
        },


        handleTreeClick: function(i) {
            var instance = this;
            var clickedTree = this.state.trees[i];

            jQuery.get(this.props.treeSource+'/'+clickedTree.id+'/branch', function(result) {
                instance.state.branches = result;
                instance.state.currentState = 'branches';
                console.log(clickedTree);
                instance.state.breadcrumbs.push(clickedTree.name);
                instance.setState(instance.state);
            }.bind(this));
        },



        handleBranchClick: function(i) {
            console.log('whatcha lookin at matey?');
        },

        render: function() {
            var instance = this;
            var contentBlock;

            if(this.state.currentState == 'trees') {
                contentBlock = (<ReactCSSTransitionGroup transitionName="trees" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                    {this.state.trees.map(function (tree, i) {
                        return <Tree onClick={instance.handleTreeClick.bind(tree, i)} tree={tree} key={i}/>;
                    })}
                </ReactCSSTransitionGroup>);
            } else if(this.state.currentState == 'branches') {
                 contentBlock = (<ReactCSSTransitionGroup transitionName="trees" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                    {this.state.branches.map(function (branch, i) {
                        return <Branch onClick={instance.handleBranchClick.bind(branch, i)} branch={branch} key={i}/>;
                    })}
                </ReactCSSTransitionGroup>);
            }
            if(this.state.currentState == 'trees') {
                return (<div className="">
                    <Header user={this.state.user}/>
                    <hr className="margin-bottom"/>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb breadcrumbs={this.state.breadcrumbs} />
                        </div>
                        <div>
                            {contentBlock}
                        </div>
                    </div>
                </div>);
            }else if(this.state.currentState == 'branches') {
                return (
                    <div>
                        <Header user={this.state.user}/>
                        <hr className="margin-bottom"/>
                        <div className="container">
                            <div className="row">
                                <Breadcrumb breadcrumbs={this.state.breadcrumbs} />
                            </div>
                            <div>
                                <ReactCSSTransitionGroup transitionName="trees" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                                {this.state.branches.map(function (branch, i) {
                                    return <Branch onClick={instance.handleBranchClick.bind(branch, i)} branch={branch} key={i}/>;
                                })}
                                </ReactCSSTransitionGroup>
                            </div>
                        </div>
                    </div>
                );
            }else if(this.state.currentState == 'login') {
                return (
                    <Login />
                );
            }

            return (
                <div className="nothing-found">
                    Nothing found.
                    <div className="row">
                        {this.state.trees.map(function(tree, i) {
                            return <Tree tree={tree} key={i} />;
                        })}
                    </div>
                </div>
            );
        }

});

ReactDOM.render(
    <Homepage treeSource="/api/tree" userSource="/api/user" />,
    document.body
);