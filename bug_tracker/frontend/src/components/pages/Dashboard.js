// Displays Form and TicketList

import React, { Fragment } from 'react';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

export default function Dashboard() {
    return (
        <Fragment>
            <TicketForm />
            <TicketList />
        </Fragment>
    )
}
