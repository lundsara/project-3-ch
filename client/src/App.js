import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  removeItem(itemId) {
    //  calling firebases remove method which specifically looks at the fb KEY for each item
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    //Allocating space in FB DB where we are storing items
    //people are bringing to potluck
    //ref method and passing in the destination we are storing the data ('items')
    const itemsRef = firebase.database().ref('items');
    // grabbed the item the user typed and username from state and packaged it in an object
    const item = {
      title: this.state.currentItem,
      user: this.state.username,
    }
    //Sends a copy of obj to store in FB
    itemsRef.push(item);
    //clear out the inputs so that addtional items can be added
    this.setState({
      currentItem: '',
      username: '',
    });
  }
  //We use this lifecycle method so that we start tracking our potluck items as soon as our component loads
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    //  snapshot callback provides overview of 'items' ref inside the db.
    itemsRef.on('value', (snapshot) => {
      //  grab of properties inside 'items' ref on FB using .val()
      console.log(snapshot.val());
      //  values fires on two occassions
      // 1) Anytime new item is added or removed from items ref inside of our DB
      // 2) The first the event listener is atached
      let items = snapshot.val();
      let newState = [];
      //push the result into an object inside new Arr coming back from our value listener
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      // we update the state with this list of items from our database
      this.setState({
        items: newState
      });
    });
  }
  
  handleChange(e) {
    //Whatever input with onChange will call handleChange and the state will change based on input name and value
    this.setState({
      [e.target.name]: e.target.value,
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

    //callback will provide an object contains a property called .user
    //Store info user info to setSet
    //signInWithPopup method is from auth module
    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }
  

  render() {
  
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Fun Food Friends</h1>
              {this.state.user ?
              <button onClick={this.logout}>Log out</button>
              :
              <button onClick={this.login}>Log in</button>
              }
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
          <div className="wrapper">
            <ul>
              {this.state.items.map((item) => {
                return (
                  <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>brought by: {item.user}</p>
                    <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        </div>
      </div>
    );
  }
}
export default App;