import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';


class User extends Component {

// delete this comment, typing something random so i can commit/pushh

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Insert what we want as our state
      username: '',
      user: null,
      message: '',
      currentItem: '',
      items: []
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
  const itemsRef = firebase.database().ref('items');
  const item = {
    title: this.state.currentItem,
    user: this.state.username
  }

  itemsRef.push(item);
  this.setState({
    currentItem: '',
    username: ''
  });
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
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        title: items[item].title,
        user: items[item].user
      });
    }
    this.setState({
      items: newState
    });
  });
}

  //   return fetch('/api/hello')
  //     .then((responseJson) => {
  //       this.setState({
  //         message: responseJson.message,
  //       });
  //     })
  // }



render() {
 return (
    <div className="reviews">
      <Header />
      <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/reviewlist" component={ReviewList} />
        <Route to="/" component={Home} />
        </Switch>
    <div className='user'>
      <header>
        <div className="wrapper">
          <h1>Reviewers Login</h1>
          {this.props.user ?
    <button onClick={this.props.logout}>Log Out</button>
    :
    <button onClick={this.props.login}>Log In</button>
  }
        </div>
      </header>
      {this.props.user ?
    <div>
      <div className='user-profile'>
        <img src={this.props.user.photoURL} />
      </div>
      <div className='container'>
      <section className='display-item'>
    <div className="wrapper">
      <ul>
        {this.props.items.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>brought by: {item.user}
                 {item.user === this.props.user.displayName || item.user === this.props.user.email ?
                   <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  </section>
    <section className='add-item'>
      <form onSubmit={this.handleReviewSubmit}>
        <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
        <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
        <button>Add Item</button>
      </form>
    </section>
  </div>
    </div>
    :
    <div className='wrapper'>
      <p>You must be logged in to see the reviews list and submit to it.</p>
    </div>
  }
</div>
        <p>Message from our backend API: <b>{this.state.message}</b></p>
        </main>
      <Footer />
    </div>
    );
  }
}

export default User;
