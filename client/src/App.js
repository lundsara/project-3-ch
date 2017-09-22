// import files
import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase';
import ReviewSearch from './components/ReviewSearch';
import Header from './components/partials/header';
import Footer from './components/partials/footer';
import Nav from './components/partials/nav';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import ReviewList from './components/ReviewList';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentReview: '',
      username: '',
      reviews: [],
      user: null,
      message: ''
    }
  // binding functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

// adding authentication for firebase
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
  handleSubmit(e) {
    e.preventDefault();
    const reviewsRef = firebase.database().ref('reviews');
    const review = {
      title: this.state.currentReview,
      user: this.state.user.displayName || this.state.user.email
    }
    reviewsRef.push(review);
    this.setState({
      currentReview: '',
      username: ''
    });
  }

  //checks every time the app loads
  componentDidMount() {
     auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    }
  });
    const reviewsRef = firebase.database().ref('reviews');
    reviewsRef.on('value', (snapshot) => {
      let reviews = snapshot.val();
      let newState = [];
      for (let review in reviews) {
        newState.push({
          id: review,
          title: reviews[review].title,
          user: reviews[review].user
        });
      }
      this.setState({
        reviews: newState
      });
    });
  }
  removeReview(reviewId) {
    const reviewRef = firebase.database().ref(`/reviews/${reviewId}`);
    reviewRef.remove();
  }

  loginComponent = (props) => {
    return (
      <Login
        {...props}
        user={this.state.user}
        login={this.login}
        reviews={this.state.reviews}
        logout={this.logout}
        removeReview={this.removeReview}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }

  render() {
  return (
    <div className='app'>

     <div>
       <Header />
         <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/reviewlist" component={ReviewList} />
          <Route exact path="/login" render={(props) => this.loginComponent(props) } />
         </Switch>
     </div>

    </div>

   );
  }
}
export default App;
