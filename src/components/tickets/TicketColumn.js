import React from 'react';
import Ticket from './Ticket';
import { sortTickets } from '../helpers/utils';

function TicketColumn({ groupKey, tickets, sortingOption, users }) {
    return (
        <div className="column">
            <h2>{groupKey}</h2>
            {sortTickets(tickets, sortingOption).map((ticket) => (
                <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    users={users}
                />
            ))}
        </div>
    );
}

export default TicketColumn;
