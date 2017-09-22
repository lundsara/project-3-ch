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
import Reviews from './components/Reviews';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
<<<<<<< HEAD

=======
import ReviewList from './components/ReviewList';
import axios from 'axios';
>>>>>>> dev


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentReview: '',
      username: '',
      reviews: [],
      user: null,
      message: '',
    };
    // binding functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleCall(event){
    console.log(`handling call: ${this.state.currentReview}`);
    event.preventDefault();
    axios.post('http://localhost:3003/api/test',{
      text: this.state.currentReview
    })
    .then((res) => {
      console.log('the data that came back: ', res);
    })
    .catch(err => console.log(err));
  }

  // adding authentication for firebase
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user,
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        });
      });
<<<<<<< HEAD
    });
}

handleSubmit(e) {
  e.preventDefault();
  const reviewsRef = firebase.database().ref('reviews');
  const review = {
    title: this.state.currentReview,
    user: this.state.user.displayName || this.state.user.email
    }
=======
  }
  handleSubmit(e) {
    e.preventDefault();
    const reviewsRef = firebase.database().ref('reviews');
    const review = {
      title: this.state.currentReview,
      user: this.state.user.displayName || this.state.user.email,
    };
>>>>>>> dev
    reviewsRef.push(review);
    this.setState({
      currentReview: '',
      username: '',
    });
  }


<<<<<<< HEAD
  componentDidMount() {
      fetch('/api/test')
      .then((response) => {
        return response.json()
      })
        .then((res) => {
          console.log(res)
          this.setState({
            message: res.score.document_tone.tone_categories["0"].tones["0"],
          })
        })
      // user auth
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
=======
>>>>>>> dev
  removeReview(reviewId) {
    const reviewRef = firebase.database().ref(`/reviews/${reviewId}`);
    reviewRef.remove();
  }
   updateReview(reviewId) {
    const reviewRef = firebase.database().ref(`/reviews/${reviewId}`);
    reviewRef.update();
  }

  loginComponent(props) {
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
<<<<<<< HEAD
        updateReview={this.updateReview}
      />
    );
  }
    reviewsComponent = (props) => {
    return (
      <Reviews
        {...props}
        user={this.state.user}
        reviews={this.state.reviews}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
   addComponent = (props) => {
    return (
      <Reviews
        {...props}
        user={this.state.user}
        reviews={this.state.reviews}
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
          <Route exact path="/reviews" render={(props) => this.reviewsComponent(props) } />
          <Route exact path="/login" render={(props) => this.loginComponent(props) } />
          <Route exact path="/add" render={(props) => this.addComponent(props) } />
         </Switch>
        <Footer />
     </div>
    </div>
=======
        handleCall={this.handleCall}
      
      />
    );
  }

  componentDidMount() {
    // INITIAL API REQUEST
    fetch('/api/test')
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({
          message: res.score.document_tone.tone_categories['0'].tones['0'],
        });
      });
    // User Auth
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    // Display reviews
    const reviewsRef = firebase.database().ref('reviews');
    reviewsRef.on('value', (snapshot) => {
      const reviews = snapshot.val();
      const newState = [];
      for (const review in reviews) {
        newState.push({
          id: review,
          title: reviews[review].title,
          user: reviews[review].user,
        });
      }
      this.setState({
        reviews: newState,
      });
    });
  }

  render() {
    return (
      <div className="app">
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/reviewlist" component={ReviewList} />
            <Route exact path="/login" render={props => this.loginComponent(props)} />
          </Switch>
        <p>This is our backend data <b>{this.state.message.score}</b></p>
        </div>
        <Footer />

      </div>
>>>>>>> dev

    );
  }
}
export default App;
