// Displays Form and TicketList

import React, { Fragment } from 'react';
import Form from './Form';
import TicketList from './TicketList';

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <TicketList />
        </Fragment>
    )
}
