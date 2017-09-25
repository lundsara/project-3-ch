// import files
import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase';
import Header from './components/partials/header';
import Footer from './components/partials/footer';
import Nav from './components/partials/nav';
import Home from './components/Home';
import Login from './components/Login';
import Reviews from './components/Reviews';
import Update from './components/Update';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentReview: '',
      username: '',
      reviews: [],
      user: null,
      message: '',
      parsedEmotion: '',
      parsedScore: null,
      parsedSentiment: [],
    };
    // binding functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
<<<<<<< HEAD
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
=======
  // handleCall(event){
  //   console.log(`handling call: ${this.state.currentReview}`);
  //   event.preventDefault();
  //   axios.post('http://localhost:3003/api/test',{
  //     text: this.state.currentReview
  //   })
  //   .then((res) => {
  //     this.setState({
  //       parsedEmotion: res.data.score.document_tone.tone_categories["0"].tones,
  //     })
  //     console.log('the data that came back: ', res);
  //   })
  //   .catch(err => console.log(err));
  // }
>>>>>>> dev

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
}

percent(num) {
  return Math.round(num * 100);
}


  handleSubmit(e) {
    e.preventDefault();

    console.log(`handling call: ${this.state.currentReview}`);
    e.preventDefault();
    axios.post('http://localhost:3003/api/test',{
      text: this.state.currentReview
    })
    .then((res) => {
      // console.log(`this is the emotion name ${res.data.score.document_tone.tone_categories["0"].tones["3"].tone_name}`)
      // console.log(`this is the emotion score ${res.data.score.document_tone.tone_categories["0"].tones["3"].score}`)
      console.log(res.data.score.document_tone.tone_categories["0"].tones)
      // console.log(this.percent(res.data.score.document_tone.tone_categories["0"].tones["3"].score))

      let emotionScore = this.percent(res.data.score.document_tone.tone_categories["0"].tones["3"].score);
      
      console.log(`Emotion score: ${emotionScore}`)

      this.setState({
        parsedEmotion: res.data.score.document_tone.tone_categories["0"].tones["3"].tone_name,
        parsedSentiment:res.data.score.document_tone.tone_categories["0"].tones,
        parsedScore: this.percent(res.data.score.document_tone.tone_categories["0"].tones["3"].score),
      })
      console.log('the data that came back: ', res);
    }).then(() => {
      const reviewsRef = firebase.database().ref('reviews');
      const review = {
        title: this.state.currentReview,
        user: this.state.user.displayName || this.state.user.email,
        feels: this.state.parsedSentiment,
      };
      reviewsRef.push(review);
      this.setState({
        currentReview: '',
        username: '',
      })
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    // INITIAL API REQUEST
    // fetch('/api/test')
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({
    //       message: res.score.document_tone.tone_categories['0'].tones['0'],
    //     });
    //   });
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

  removeReview(reviewId) {
    const reviewRef = firebase.database().ref(`/reviews/${reviewId}`);
    reviewRef.remove();
  }

  updateReview(reviewId, e) {
    e.preventDefault();
    const reviewsRef = firebase.database().ref(`/reviews/${reviewId}`);
    console.log(reviewsRef);
    console.log(reviewId);
    const newReview = {
      title: 'new title',
    };
    reviewsRef.set(newReview);
    this.setState({
      currentReview: '',
      username: '',
    });
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
        handleCall={this.handleCall}
=======
>>>>>>> dev
        updateReview={this.updateReview}
        parsedEmotion={this.state.parsedEmotion}
        parsedScore={this.state.parsedScore}
        parsedSentiment={this.state.parsedSentiment}
      />
    );
  }
    reviewsComponent = (props) => {
    return (
      <Reviews
        {...props}
        user={this.state.user}
        reviews={this.state.reviews}

      />
    );
  }

   updateComponent = (props) => {
    return (
      <Update
        {...props}
        user={this.state.user}
        login={this.login}
        reviews={this.state.reviews}
        logout={this.logout}
        removeReview={this.removeReview}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleCall={this.handleCall}
        updateReview={this.updateReview}
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
          <Route exact path="/update" render={(props) => this.updateComponent(props) } />
         </Switch>
<<<<<<< HEAD

=======
>>>>>>> dev
        <Footer />
     </div>
    </div>

    );
  }

}

export default App;
