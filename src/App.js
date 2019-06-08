import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
// components
import LoginForm from './components/sign-up'
import { fetchDataGet } from './support-functions/fetch'
function Home() {
  return <h2>Home</h2>;
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
    fetchDataGet('/test/').then(response => {
      console.log(response)
    })
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    fetchDataGet('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response)
      if (response.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    const redirUrl = this.state.loggedIn ? '/' : '/login';
    return (
      <div >
   
       <Redirect
          exact={true}
          from="/"
          to={{ pathname: redirUrl }}
        />
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
      </div>
    );
  }
}

export default App;