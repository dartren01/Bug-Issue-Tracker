import React, { Component, } from 'react';
import axios from 'axios';

export class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        axios.get("api/tickets")
            .then(res => {
                const ticketData = res.data;
                this.setState({
                    tickets: ticketData,
                    loaded: true
                })
            })
            .catch(err => {
                console.log("ERROR ", err);
            });
    }

    handleDelete = (id) => {
        axios.delete(`api/tickets/delete/${id}`)
            .then(res => {
                let arrCopy = [...this.state.tickets];
                const newTickets = arrCopy.filter(ticket => ticket.id !== id);
                this.setState({
                    tickets: newTickets
                });
                console.log("Ticket Deleted");
            })
            .catch(err => {
                console.log("ERROR ", err);
            });
    }

    render() {
        return (
            <div>
                <h1>Ticket List</h1>
                <ul>
                    {this.state.tickets.map(ticket =>
                        <li key={ticket.id}>
                            {ticket.title}
                            <br></br>
                            {ticket.description}
                            <button onClick={() => this.handleDelete(ticket.id)}>Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default TicketList
