// import files
import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase';
import ReviewSearch from './components/ReviewSearch';
import Header from './components/partials/header';
import Footer from './components/partials/footer';
import Nav from './components/partials/nav';
import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import ReviewList from './components/ReviewList';

// delete this comment, typing something random so i can commit/pushh

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Insert what we want as our state
      username: '',
      user: null,
      message: ''
    }
    // insert code that needs to be bind in here.
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleInputOrganizerChange = this.handleInputOrganizerChange.bind(this);
    this.handleInputReviewChange = this.handleInputReviewChange.bind(this);
    this.handleInputDateChange = this.handleInputDateChange.bind(this);
    this.handleInputNameChange = this.handleInputNameChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);

  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  handleReviewSubmit(e) {
    e.preventDefault();
    // add what data you want firebase to see and add
  }
 handleInputOrganizerChange(event) {
    this.setState({
      inputOrganizerValue: event.target.value
    })
  }

  handleInputReviewChange(event) {
    this.setState({
      inputReviewValue: event.target.value
    })
  }

  handleInputNameChange(event) {
    this.setState({
      inputNameValue: event.target.value
    })
  }

  handleInputDateChange(event) {
    this.setState({
      inputDateValue: event.target.value
    })
  }


  componentDidMount() {
    // auth.onAuthStateChanged((user) => {
    //   if(user) {
    //     this.setState({ user });
    //   }
    // });

    return fetch('/api/hello')
      .then((responseJson) => {
        this.setState({
          message: responseJson.message,
        });
      })
  }

render() {
 return (
    <div className="quotes">
      <Header />
      <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/reviewlist" component={ReviewList} />
       <Redirect to="/" />
        </Switch>
        <p>Message from our backend API: <b>{this.state.message}</b></p>
        </main>
      <Footer />
    </div>
    );
  }
}


export default App;

