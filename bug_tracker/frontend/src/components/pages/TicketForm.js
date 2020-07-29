import React, { Component } from 'react';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Cookies from "js-cookie"


class TicketForm extends Component {
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
        const newTicket = {
            title: this.state.title,
            description: this.state.description,
            isCompleted: false
        };
        let csrfCookie = Cookies.get('XSRF-TOKEN');
        axios.post('/api/tickets/create', newTicket, {
            headers: {
                'X-CSRFTOKEN': csrfCookie,
            }
        })
            .then(res => {
                console.log("ticket add success");
                this.props.history.push("/");
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
                            as="textarea"
                            rows="3"
                            name="description"
                            placeholder="description"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Button
                        variant="outline-primary"
                        onClick={(e) => this.handleSubmit(e)}>
                        Create
                    </Button>
                </Form>
            </div>
        )
    }
}

export default TicketForm
