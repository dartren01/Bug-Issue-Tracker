import React, { Component, } from 'react';
import axios from 'axios';

export class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        axios.get("api/tickets")
            .then(res => {
                const ticketData = res.data;
                this.setState({
                    data: ticketData,
                    loaded: true
                })
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
                    {this.state.data.map(ticket =>
                        <li>
                            {ticket.title}
                            <br></br>
                            {ticket.description}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default TicketList
