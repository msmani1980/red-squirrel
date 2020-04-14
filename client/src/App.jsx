import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Items from './components/Items';
import ItemCreate from './components/ItemCreate';
import ItemEdit from './components/ItemEdit';
import ItemDetail from './components/ItemDetail';
import { Route, Switch, Redirect } from 'react-router-dom';
import { verifyUser } from './services/user';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await verifyUser();
    if (user) {
      this.setState({ user });
    }
  }

  setUser = (user) => this.setState({ user });

  clearUser = () => this.setState({ user: null });

  render() {
    const { setUser, clearUser } = this;
    const { user } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Home user={user} />} />
          <Route
            exact
            path="/sign-up"
            render={(props) => (
              <SignUp setUser={setUser} history={props.history} />
            )}
          />
          <Route
            exact
            path="/sign-in"
            render={(props) => (
              <SignIn setUser={setUser} history={props.history} />
            )}
          />
          <Route
            exact
            path="/sign-out"
            render={(props) => (
              <SignOut
                user={user}
                clearUser={clearUser}
                history={props.history}
              />
            )}
          />
          <Route exact path="/products" render={() => <Items user={user} />} />
          <Route
            exact
            path="/add-product"
            render={() =>
              user ? <ItemCreate user={user} /> : <Redirect to="/signup" />
            }
          />
          <Route
            exact
            path="/products/:id/edit"
            render={(props) =>
              user ? <ItemEdit {...props} user={user} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/products/:id"
            render={(props) => (
              <ItemDetail {...props} history={props.history} user={user} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;