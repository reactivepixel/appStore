  var HelloWorld = React.createClass({

    propTypes: {
      name: React.PropTypes.string
    },

    getDefaultProps: function(){
      return {
        name: 'Lucas'
      }
    },

    render: function(){
      return(
        <span>{this.props.name}</span>
      )
    }
  });

  ReactDOM.render(
    <HelloWorld name='bob' isGender='male' />,
    document.getElementById('app')
  );
