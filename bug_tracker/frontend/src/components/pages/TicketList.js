import React, { Component, } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class TicketList extends Component {
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

    handleUpdateRedirect = (id) => {
        this.props.history.push({
            pathname: '/update_ticket',
            state: {
                ticketId: id
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Ticket List</h1>
                {this.state.tickets.map(ticket =>
                    <div className="card" key={ticket.id}>
                        <div className="card-body">
                            <h2 className="card-title">{ticket.title}</h2>
                            <p className="card-text">{ticket.description}</p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-muted">{ticket.isCompleted ? "Completed" : "Not Completed"}</h5>
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.handleUpdateRedirect(ticket.id)}>Update</button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => this.handleDelete(ticket.id)}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(TicketList);
