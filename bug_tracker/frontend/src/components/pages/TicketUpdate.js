import React, { Component } from 'react';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { withRouter } from 'react-router';



class TicketUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            loaded: false,
            ticketId: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUpdate = (event) => {
        const newTicket = {
            title: this.state.title,
            description: this.state.description
        }
        let csrfCookie = Cookies.get('XSRF-TOKEN');
        axios.put(`/api/tickets/${this.state.ticketId}`, newTicket, {
            headers: {
                'X-CSRFTOKEN': csrfCookie,
            }
        })
            .then(res => {
                console.log("ticket update success");
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("ticket update error: " + err)
            });
    }

    componentDidMount = () => {
        axios.get(`api/tickets/${this.props.location.state.ticketId}`)
            .then(res => {
                const ticketData = res.data;
                this.setState({
                    title: ticketData.title,
                    description: ticketData.description,
                    loaded: true,
                    ticketId: this.props.location.state.ticketId
                })
            })
            .catch(err => {
                console.log("ERROR ", err);
            });
    }


    render() {
        return (
            <div>
                <h1>Update Ticket</h1>
                <Form className="col-sm-8">
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            defaultValue={this.state.title}
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            name="description"
                            defaultValue={this.state.description}
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Button
                        variant="outline-primary"
                        onClick={(e) => this.handleUpdate(e)}>
                        Update
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(TicketUpdate);
