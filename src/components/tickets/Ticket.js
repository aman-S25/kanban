import React from 'react';
import { ticketUserAvailabilityClass, ticketUserName, mapPriorityLevelToName } from '../helpers/utils';

function Ticket({ ticket, users }) {
    return (
        <div className={`ticket priority-${ticket.priority}`}>
            <div className="ticket-title">{ticket.title}</div>
            <br />
            <div className={`ticket-userId ${ticketUserAvailabilityClass(ticket.userId, users)}`}>
                {ticketUserName(ticket.userId, users) || 'Unknown User'}
            </div>
            <br />
            <div className="ticket-priority">{mapPriorityLevelToName(ticket.priority)}</div>
        </div>
    );
}

export default Ticket;
