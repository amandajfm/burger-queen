import React from 'react';
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
            displayName: "",
            email: "",
            password: "",
            type: "Salao",
        };
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    createUser = () => {
        this.props.createUserWithEmailAndPassword(
            this.state.email, this.state.password)
            .then(response => {
                if (response) {
                    const id = response.user.uid;
                    database.collection("users").doc(id).set({
                        displayName: this.state.displayName,
                        email: this.state.email,
                        password: this.state.password,
                        type: this.state.type
                    })
                        .then(() => {
                            this.props.history.push(`/${this.state.type}/${id}`);
                        });
                }
            });
    }

    render() {
        if (this.props.error) {
            if (this.props.error === "The email address is already in use by another account.") {
                alert("O seu email já está cadastrado em uma conta");
            }
        }
        return (
            <div className="App-Header">
                <div>
                    <img src={logo} alt="Logo" className="App-logo" />
                </div>
                <div className="Margin">
                    <Input value={this.state.displayName} text={"Digite seu nome de usuário"}
                        onChange={(e) => this.handleChange(e, "displayName")} />
                </div>
                <div>
                    <Input value={this.state.email}
                        text={"Digite seu email"} onChange={(e) => this.handleChange(e, "email")} />
                </div>
                <div className="Margin">
                    <Input value={this.state.password}
                        text={"Digite seu password com 6 caracteres"} onChange={(e) => this.handleChange(e, "password")} />
                </div>
                <div>
                    <select className="Select" onChange={(e) => this.handleChange(e, "type")}>
                        <option value="Salão">
                            Eu trabalho no Salão
                    </option>
                        <option value="Cozinha">
                            Eu trabalho na Cozinha
                    </option>
                    </select>
                </div>
                <div className="Margin">
                    <Button className="Button" text="Cadastre um novo usuário" onClick={this.createUser} />
                </div>
                <div>
                    <Link to="/" className="Link">Já tem um perfil? Vá para a tela de login</Link>
                </div>
            </div>
        );
    }
}

export default withFirebaseAuth({ firebaseAppAuth })(Home);
