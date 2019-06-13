import React from 'react';
import Button from '../components/Button';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Cozinha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: []
        };
    }

    componentDidMount() {
        database.collection('Orders').get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => doc.data())
                console.log();
                this.setState({ order: data });
            });
    }

    render() {
        return (
            <div>
                <h1> AQUI É A COZINHA</h1>                
                <div>
                    {
                        this.state.order.map((item, index) => {
                            console.log(item)
                            return <p key={index}>{item.waiter} | {item.client}</p>
                        })
                    }
                </div>
                <div className="Margin">
                    <Link to="/" className="Link">Deslogar</Link>
                </div>
            </div>
        );
    }
}

export default withFirebaseAuth({ firebaseAppAuth })(Cozinha);
