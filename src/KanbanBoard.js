import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';

function mapPriorityLevelToName(priorityLevel) {
  switch (priorityLevel) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
      return 'No priority';
    default:
      return 'Unknown';
  }
}

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status'); // Default grouping by Status
  const [sortingOption, setSortingOption] = useState('priority'); // Default sorting by Priority

  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data structure from the API matches the previous data structure
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to determine the user availability CSS class
  const ticketUserAvailabilityClass = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user?.available ? 'user-available' : 'user-unavailable';
  };

  // Function to retrieve the user name based on userId
  const ticketUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user?.name;
  };

  // Define grouping and sorting functions
  const groupByStatus = (tickets) => {
    // Group tickets by status
    const grouped = {};
    tickets.forEach((ticket) => {
      if (!grouped[ticket.status]) {
        grouped[ticket.status] = [];
      }
      grouped[ticket.status].push(ticket);
    });
    return grouped;
  };

  const groupByUser = (tickets) => {
    // Group tickets by user
    const grouped = {};
    tickets.forEach((ticket) => {
      if (!grouped[ticket.userId]) {
        grouped[ticket.userId] = [];
      }
      grouped[ticket.userId].push(ticket);
    });
    return grouped;
  };

  const groupByPriority = (tickets) => {
    // Group tickets by priority
    const grouped = {};
    tickets.forEach((ticket) => {
      if (!grouped[ticket.priority]) {
        grouped[ticket.priority] = [];
      }
      grouped[ticket.priority].push(ticket);
    });
    return grouped;
  };

  // Update the groupedTickets based on the chosen grouping option
  const [groupedTickets, setGroupedTickets] = useState(groupByStatus(tickets));

  // Function to sort tickets
  const sortTickets = (ticketsToSort, sortingOption) => {
    return ticketsToSort.sort((a, b) => {
      if (sortingOption === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return b.priority - a.priority;
      }
    });
  };

  // Update the sortedTickets based on the chosen sorting option
  const [sortedTickets, setSortedTickets] = useState(sortTickets(tickets, sortingOption));

  // Update groupedTickets and sortedTickets when grouping or sorting options change
  useEffect(() => {
    if (groupingOption === 'status') {
      setGroupedTickets(groupByStatus(tickets));
    } else if (groupingOption === 'user') {
      setGroupedTickets(groupByUser(tickets));
    } else if (groupingOption === 'priority') {
      setGroupedTickets(groupByPriority(tickets));
    }
  }, [groupingOption, tickets]);

  useEffect(() => {
    setSortedTickets(sortTickets(tickets, sortingOption));
  }, [sortingOption, tickets]);

  // Load user preferences from localStorage (if available)
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

  // Update user preferences in localStorage when they change
  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem('sortingOption', sortingOption);
  }, [sortingOption]);

  return (
    <>
      <div className="dropdown">
        {/* Add UI controls for grouping and sorting options here */}
        <button className="dropbtn">Group & Sort</button>
        <div className="dropdown-content">
          <button onClick={() => setGroupingOption('status')}>Group by Status</button>
          <button onClick={() => setGroupingOption('user')}>Group by User</button>
          <button onClick={() => setGroupingOption('priority')}>Group by Priority</button>
          <button onClick={() => setSortingOption('priority')}>Sort by Priority</button>
          <button onClick={() => setSortingOption('title')}>Sort by Title</button>
        </div>
      </div>

      <div className="kanban-board">
        {/* Render grouped and sorted tickets */}
        {groupedTickets &&
          Object.keys(groupedTickets).map((groupKey) => (
            <div key={groupKey} className="column">
              <h2>{groupKey}</h2>
              {sortTickets(groupedTickets[groupKey], sortingOption).map((ticket) => (
                <div key={ticket.id} className={`ticket priority-${ticket.priority}`}>
                  <div className="ticket-title">{ticket.title}</div><br/>
                  <div className={`ticket-userId ${ticketUserAvailabilityClass(ticket.userId)}`}>
                    {ticketUserName(ticket.userId) || 'Unknown User'}
                  </div><br/>
                  <div className="ticket-priority">{mapPriorityLevelToName(ticket.priority)}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default KanbanBoard;
