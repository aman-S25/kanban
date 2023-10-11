import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';
import TicketColumn from './tickets/TicketColumn';
import GroupSortDropdown from './dropdown/GroupSortDropdown';
import { sortTickets, ticketUserName, mapPriorityLevelToName } from './helpers/utils';

function KanbanBoard() {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupingOption, setGroupingOption] = useState('status');
    const [sortingOption, setSortingOption] = useState('priority');


    useEffect(() => {
        // ******* Here I am  fetching data from the API *****************
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then((response) => response.json())
            .then((data) => {
                setTickets(data.tickets);
                setUsers(data.users);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // *********** To Update groupedTickets and sortedTickets when grouping or sorting options change ***********
    useEffect(() => {
        if (groupingOption === 'status') {
            setGroupedTickets(groupByStatus(tickets));
        } else if (groupingOption === 'user') {
            setGroupedTickets(groupByUser(tickets, users));
        } else if (groupingOption === 'priority') {
            setGroupedTickets(groupByPriority(tickets));
        }
    }, [groupingOption, tickets, users]);

    useEffect(() => {
        setSortedTickets(sortTickets(tickets, sortingOption));
    }, [sortingOption, tickets]);

    //*********** For Loading user preferences from localStorage (if available) ***************
    useEffect(() => {
        const savedGroupingOption = localStorage.getItem('groupingOption');
        if (savedGroupingOption) {
            setGroupingOption(savedGroupingOption);
        }

        const savedSortingOption = localStorage.getItem('sortingOption');
        if (savedSortingOption) {
            setSortingOption(savedSortingOption);
        }
    }, []);

    // ************ For Updating user preferences in localStorage when they change *****************
    useEffect(() => {
        localStorage.setItem('groupingOption', groupingOption);
    }, [groupingOption]);

    useEffect(() => {
        localStorage.setItem('sortingOption', sortingOption);
    }, [sortingOption]);


    //***********  Defining grouping and sorting functions here*****************
    const groupByStatus = (tickets) => {
        //******* for Grouping tickets by status********
        const grouped = {};
        tickets.forEach((ticket) => {
            if (!grouped[ticket.status]) {
                grouped[ticket.status] = [];
            }
            grouped[ticket.status].push(ticket);
        });
        return grouped;
    };

    const groupByUser = (tickets, users) => {
        //******* for Grouping tickets by Users********
        const grouped = {};
        tickets.forEach((ticket) => {
            if (!grouped[ticketUserName(ticket.userId, users)]) {
                grouped[ticketUserName(ticket.userId, users)] = [];
            }
            grouped[ticketUserName(ticket.userId, users)].push(ticket);
        });
        return grouped;
    };

    const groupByPriority = (tickets) => {
        //******* for Grouping tickets by Priority********
        const grouped = {};
        tickets.forEach((ticket) => {
            if (!grouped[mapPriorityLevelToName(ticket.priority)]) {
                grouped[mapPriorityLevelToName(ticket.priority)] = [];
            }
            grouped[mapPriorityLevelToName(ticket.priority)].push(ticket);
        });
        return grouped;
    };

    //*********** for Updating the groupedTickets based on the chosen grouping option ****************
    const [groupedTickets, setGroupedTickets] = useState(groupByStatus(tickets));


    //***************  for Updating the sortedTickets based on the chosen sorting option *************
    const [sortedTickets, setSortedTickets] = useState(sortTickets(tickets, sortingOption));

    return (
        <>
            <GroupSortDropdown
                groupingOption={groupingOption}
                setGroupingOption={setGroupingOption}
                sortingOption={sortingOption}
                setSortingOption={setSortingOption}
            />

            <div className="kanban-board">
                {groupedTickets &&
                    Object.keys(groupedTickets).map((groupKey) => (
                        <TicketColumn
                            key={groupKey}
                            groupKey={groupKey}
                            tickets={groupedTickets[groupKey]}
                            sortingOption={sortingOption}
                            users={users}
                        />
                    ))}
            </div>
        </>
    );
}

export default KanbanBoard;
