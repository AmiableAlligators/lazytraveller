import React from 'react';

const ActivityView = ({ activity, handleLikeClick, shortlist }) => (
  <div className="ui card">
    <div className="image">
      <img src={ activity.image } />
    </div>
    <div className="content">
      <a className="header">{ activity.name }</a>
      <p>{ `${activity.address.street} ${activity.address.city}, ${activity.address.state} ${activity.address.postal_code}` }</p>
      <div className="meta">
        <span className="">Rating: { activity.rating }</span>
      </div>
      <div style={{padding: '10px', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc'}}>
        <span className="">{ activity.price }</span>
        <span><i className="call icon"></i> { activity.phone_number }</span>
        <span style={{float: 'right'}}>{ !activity.isClosed ? 'Open' : 'Closed' }</span>
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
          onClick={ shortlist.bind(null, activity.id) }>Shortlist</div>
      </div>
    </div>
  </div>
);

export default ActivityView;
