import React from 'react';

// ThoughtList is receiving two props ( a title and a thoughts array) but is destructured to avoiding using props.----
const ThoughtList = ({ thoughts, title }) => {
    if (!thoughts.length) {
        return <h3>No Thoughts Yet</h3>;
    }

    return (
        <div>
        <h3>{title}</h3>
        {thoughts &&
            thoughts.map(thought => (
            // key prop helps react rack what data needs to be re-rendered if something changes
            <div key={thought._id} className="card mb-3">
                <p className="card-header">
                    {thought.username}
                    thought on {thought.createdAt}
                </p>
                <div className="card-body">
                    <p>{thought.thoughtText}</p>
                    <p className="mb-0">
                        Reactions: {thought.reactionCount} || Click to{' '}
                        {thought.reactionCount ? 'see' : 'start'} the discussion!
                    </p>
                </div>
            </div>
            ))}
        </div>
  );
};

export default ThoughtList;