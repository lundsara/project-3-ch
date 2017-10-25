// import files
import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase';
import Header from './components/partials/header';
import Nav from './components/partials/nav';
import Home from './components/Home';
import Login from './components/Login';
import Reviews from './components/Reviews';
import Update from './components/Update';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)

    this.state = {
      currentReview: '',
      username: '',
      reviews: [],
      user: null,
      message: '',
      parsedEmotion: '',
      parsedScore: null,
      parsedSentiment: [],
      reviewToUpdate: {},
      reviewToUpdateID: ''
    };
    // binding functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.percent = this.percent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getReviewToUpdate = this.getReviewToUpdate.bind(this);

  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCall(event){
    console.log(`handling call: ${this.state.currentReview}`);
    event.preventDefault();
    axios.post('/api/test',{
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
}

percent(num) {
  return Math.round(num * 100);
}


  handleSubmit(e) {
    e.preventDefault();

    console.log(`handling call: ${this.state.currentReview}`);
    e.preventDefault();
    axios.post('/api/test',{
      text: this.state.currentReview
    })
    .then((res) => {

      let emotionScore = this.percent(res.data.score.document_tone.tone_categories["0"].tones["3"].score);

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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    // Display reviews + feels
    const reviewsRef = firebase.database().ref('reviews');
    reviewsRef.on('value', (snapshot) => {
      console.log(snapshot.val())
      const reviews = snapshot.val();
      const newState = Object.keys(reviews).map((key) => {
        const review = {
          ...reviews[key],
          id: key,
        };
        return review;
      })
      this.setState({
        reviews: newState,

      });
    });
  }


  removeReview(reviewId) {
    const reviewRef = firebase.database().ref(`/reviews/${reviewId}`);
    reviewRef.remove();
  }

  getReviewToUpdate(id){
    const reviewRef = firebase.database().ref(`/reviews/${id}`)
    .once('value')
    .then(snapshot=> {
      const review = snapshot.val().title;
      console.log(review);
      this.setState({
        reviewToUpdate: review,
        reviewToUpdateID: id
      })
    });

  }

  updateReview(e) {
    e.preventDefault();

    axios.post('/api/test',{
      text: this.state.currentReview
    })
    .then((res) => {

      let emotionScore = this.percent(res.data.score.document_tone.tone_categories["0"].tones["3"].score);

      this.setState({
        parsedEmotion: res.data.score.document_tone.tone_categories["0"].tones["3"].tone_name,
        parsedSentiment: res.data.score.document_tone.tone_categories["0"].tones,
        parsedScore: this.percent(res.data.score.document_tone.tone_categories["0"].tones["3"].score),
      })
      console.log('the data that came back: ', res);
    })
    .then(() => {
      const reviewsRef = firebase.database().ref(`/reviews/${this.state.reviewToUpdateID}`);
      const newReview = {
        title: this.state.currentReview,
        user: this.state.user.displayName || this.state.user.email,
        feels: this.state.parsedSentiment
      };
      reviewsRef.set(newReview);
      this.setState({
        currentReview: '',
        username: '',
      });
    })
    .catch(err => console.error(err));
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
        handleCall={this.handleCall}
        updateReview={this.updateReview}
        parsedEmotion={this.state.parsedEmotion}
        parsedScore={this.state.parsedScore}
        parsedSentiment={this.state.parsedSentiment}
        percent={this.state.percent}
        getReviewToUpdate={this.getReviewToUpdate}
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
        parsedEmotion={this.state.parsedEmotion}
        parsedScore={this.state.parsedScore}
        parsedSentiment={this.state.parsedSentiment}
        reviewToUpdate={this.state.reviewToUpdate}
      />
    );
  }

render() {

  return (
    <div className='app'>
    <Router>
     <div>
       <Header />
         <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/reviews" render={(props) => this.reviewsComponent(props) } />
          <Route exact path="/login" render={(props) => this.loginComponent(props) } />
          <Route exact path="/update" render={(props) => this.updateComponent(props) } />
         </Switch>

     </div>
    </Router>
  </div>
    );
  }

}

export default App;
