import React from 'react';

const ActivityView = ({ activity, handleLikeClick }) => (
  <div className="ui card">
    <div className="image">
      <img src={ activity.image } />
    </div>
    <div className="content">
      <a className="header">{ activity.name }</a>
      <div className="meta">
        <span className="">Rating: { activity.rating }</span>
        <span className="">{ activity.price }</span>
      </div>
      <div className="description">
        { activity.description }
      </div>
    </div>
    <div className="extra content">
      <div className="ui two buttons">
        <div className="ui basic red button"
          onClick={ () => { handleClick( false, activity.id ) } }>Dislike</div>
        <div className="ui basic green button"
          onClick={ () => { handleClick( true, activity.id ) } }>Shortlist</div>
      </div>
    </div>
  </div>
);

export default ActivityView;
