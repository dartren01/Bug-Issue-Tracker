import React, { Component } from 'react';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Cookies from "js-cookie"


export class TicketForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newTicket = {
            title: this.state.title,
            description: this.state.description
        }
        axios.post('/api/tickets', newTicket, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                console.log("ticket add success");
                window.location.reload();
            })
            .catch(err => {
                console.log("ticket add error: " + err)
            });
    }


    render() {
        return (
            <div>
                <h1>Add A Ticket</h1>
                <Form className="col-sm-8">
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="title"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="description"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Button
                        variant="outline-secondary"
                        onClick={(e) => this.handleSubmit(e)}>
                        Create
                    </Button>
                </Form>
            </div>
        )
    }
}

export default TicketForm
