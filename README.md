# auth-graphql-starter

GraphQl using with passport for authentication


```
// Pass cookies to graphql
app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema,
    graphiql: true, // or whatever you want
    context: { req, res },
  })(req, res);
);
```


// Required auth , HOC to defined which one could sit behind authentication
```
export default (WrapComponent) => {

  class RequiredAuth extends Component {

    constructor(props) {
      super(props);
    }

    // Update everytime data is updated
    componentWillUpdate() {
      const { user, loading } = this.props.data;
      console.log('>>>> requiredAuth', user, loading);
      if (!loading && user) {
        hashHistory.push('/signin');
      }
    }

    render() {
      return <WrapComponent {...this.props} />
    }
  }

  return graphql(user)(RequiredAuth);
}

```