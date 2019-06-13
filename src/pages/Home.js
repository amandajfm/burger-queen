import React from 'react';
import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import firebase from "../firebaseConfig";
import logo from "../components/Logo.jpg";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(
      this.state.email,
      this.state.password)
      .then((response) => {
        const id = response.user.uid;
        database.collection("users").doc(id).get()
          .then(response => {
            const data = response.data();
            this.props.history.push(`/${data.type}/${id}`)
          })
      });
  }

  render() {
    return (
      <div className="App-Header">
        <div>
          <img src={logo} alt="Logo" className="App-logo" />
        </div>
        <div className="Margin">
          <Input value={this.state.email}
            text={"Digite seu email"} onChange={(e) => this.handleChange(e, "email")} />
        </div>
        <div>
          <Input value={this.state.password}
            text={"Digite seu password"} onChange={(e) => this.handleChange(e, "password")} />
        </div>
        <div className="Margin">
          <Button className="Button" text="Entre no seu perfil" onClick={this.signIn} />
        </div>
        <div>
          <Link to="/Register" className="Link">Cadastre um novo perfil</Link>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Home);
