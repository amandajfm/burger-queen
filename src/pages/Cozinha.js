import React from 'react';
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
                <h2>Cozinha - Pedidos</h2>                
                <div>
                    {
                        this.state.order.map((item, index) => {
                            return (<div className="Margin Order KitchenOrder">
                                <p key={index}>Garçon {item.waiter} | Cliente {item.client}</p>
                                <p key={index}>Realizado em {item.hour}</p>
                            
                            {item.order.map((item, index) => {
                                return  <p key={index}>{item.nome} - {item.quantity}</p>
                                    
                              })
                            }
                   
                            </div>
                        )})
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
