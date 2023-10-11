export const sortTickets = (ticketsToSort, sortingOption) => {
    return ticketsToSort.sort((a, b) => {
        if (sortingOption === 'title') {
            return a.title.localeCompare(b.title);
        } else {
            return b.priority - a.priority;
        }
    });
};

export const ticketUserAvailabilityClass = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user?.available ? 'user-available' : 'user-unavailable';
};

export const ticketUserName = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user?.name;
};

export const mapPriorityLevelToName = (priorityLevel) => {
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
};
