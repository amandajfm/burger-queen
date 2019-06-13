import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();
const menuBreakfast = [
    {
        nome: "Café Americano",
        preco: 5
    },
    {
        nome: "Café com leite",
        preco: 7
    },
    {
        nome: "Suco de fruta natural",
        preco: 7
    },
    {
        nome: "Sanduíche de presunto e queijo",
        preco: 10        
    },
];
const menuLunch = [
    {
        nome: "Hambúrguer Simples (Carne Bovina)",
        preco: 10
    },
    {
        nome: "Hambúrguer Simples (Carne de frango)",
        preco: 10
    },
    {
        nome: "Hambúrguer Simples (Vegetariano)",
        preco: 10
    },
    {
        nome: "Hambúrguer Duplo (Carne Bovina)",
        preco: 15
    },
    {
        nome: "Hambúrguer Duplo (Carne de frango)",
        preco: 15
    },
    {
        nome: "Hambúrguer Duplo (Vegetariano)",
        preco: 15
    },
    {
        nome: "Batata Frita",
        preco: 5
    },
    {
        nome: "Anéis de Cebola",
        preco: 5
    },
    {
        nome: "Água 500ml",
        preco: 5
    },
    {
        nome: "Água 750ml",
        preco: 7
    },
    {
        nome: "Bebida Gaseificada 500ml",
        preco: 7
    },
    {
        nome: "Bebida Gaseificada 750ml",
        preco: 10
    },
    {
        nome: "Batata Frita",
        preco: 5
    },
    {
        nome: "Adicional de Queijo",
        preco: 1
    },
    {
        nome: "Adicional de Ovo",
        preco: 1
    },
];

class Salao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: "",
            waiter: "",
            order: []
        };
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    ordersClick = (item) => {
        const itemIndex = this.state.order.findIndex((menuItem) => {
            return menuItem.nome === item.nome;
        })
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            };
            this.setState({
                order: this.state.order.concat(newItem)
            });
        } else {
            let newOrder = this.state.order;
            newOrder[itemIndex].quantity += 1;
            this.setState({
                order: newOrder
            });
        }
    }

    deleteClick = (item) => {
        const itemIndex = this.state.order.findIndex((menuItem) => {
            return menuItem.nome === item.nome;
        });

        let newOrder = this.state.order;
        newOrder[itemIndex].quantity -= 1;

        const quantity = newOrder[itemIndex].quantity;

        if (quantity > 0) {
            this.setState({
                order: newOrder
            });
        } else {
            newOrder.splice(itemIndex, 1);
            this.setState({
                order: newOrder
            });
        }
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        database
            .collection('users')
            .doc(id)
            .get()
            .then((response) => {
                const { displayName } = response.data();
                this.setState({ 
                    waiter: displayName,
                });
            });
    }

    createNewOrder = () => {
        const { client, order, waiter } = this.state;
        const newOrder = {
            client,
            order,
            waiter,
        }
        database.collection('Orders').add(newOrder)
    }

    render() {
        const { waiter } = this.state;
        const fullOrderPrice = this.state.order.reduce((acc, curval) => {
            return acc + (curval.preco * curval.quantity)
        }, 0);
        return (
            <div>
                <h1>Menu de Café da Manhã</h1>
                {
                    menuBreakfast.map((menuItem, index) => {
                        return <Button className="Button SalaoButton" key={index} text={menuItem.nome} onClick={() => this.ordersClick(menuItem)}>
                        </Button>
                    })
                }
                <h1>Menu de Almoço e Jantar</h1>
                {
                    menuLunch.map((menuItem, index) => {
                        return <Button className="Button SalaoButton" key={index} text={menuItem.nome} onClick={() => this.ordersClick(menuItem)}>
                        </Button>
                    })
                }
                <div className="Order">
                    <h3>Itens do Pedido</h3>
                    {
                        this.state.order.map((menuItem, index) => {
                            return <div key={index}>
                                <p>{menuItem.nome} - {menuItem.preco * menuItem.quantity} -
                                    {menuItem.quantity}</p>
                                <Button className="Button ExcluirItem" text="Excluir item" onClick={() => this.deleteClick(menuItem)}></Button>
                            </div>
                        })
                    }
                    <h4>Total</h4>
                <p>R$ {fullOrderPrice}</p>
                </div>
                <div>
                <Input value={this.state.client} text={"Digite o nome de seu cliente"}
                    onChange={(e) => this.handleChange(e, "client")} />
                <Button className="Button" text="Enviar o pedido" onClick={this.createNewOrder} />
                </div>
                <div className="Margin">
                    <Link to="/" className="Link">Deslogar</Link>
                </div>
            </div>
            
        );
        
    }
}

export default withFirebaseAuth({ firebaseAppAuth })(Salao);
