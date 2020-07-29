// Displays Form and TicketList

import React, { Component, Fragment } from 'react';
import TicketList from './TicketList';

class Dashboard extends Component {
    render() {
        return (
            <Fragment>
                <TicketList />
            </Fragment>
        )
    }

}

export default Dashboard;