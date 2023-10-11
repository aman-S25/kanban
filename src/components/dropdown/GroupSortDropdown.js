import React from 'react';

function GroupSortDropdown({
    groupingOption,
    setGroupingOption,
    sortingOption,
    setSortingOption,
}) {
    return (
        <div className="dropdown">
            <button className="dropbtn">Group & Sort</button>
            <div className="dropdown-content">
                <button onClick={() => setGroupingOption('status')}>Group by Status</button>
                <button onClick={() => setGroupingOption('user')}>Group by User</button>
                <button onClick={() => setGroupingOption('priority')}>Group by Priority</button>
                <button onClick={() => setSortingOption('priority')}>Sort by Priority</button>
                <button onClick={() => setSortingOption('title')}>Sort by Title</button>
            </div>
        </div>
    );
}

export default GroupSortDropdown;
