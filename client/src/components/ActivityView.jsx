import React from 'react';

const ActivityView = ({ activity, shortlist, discard, photos, showGallery, }) => (
  <div className="ui card centered">
    <div className="image">
      <img style={{minHeight: '180px'}} src={ activity.image }
        onClick={ showGallery } />
        <div style={{textAlign: 'left', padding: '5px 0 0 5px'}}><strong>Photos</strong></div>
        <div className="scroll" style={{paddingTop: '5px', backgroundColor: 'white', height: '95px', display: '-webkit-box', 'overflowY': 'hidden'}} >
          <div>
            {
              photos &&
              photos.slice(1).map((photo, index) => (
                <img style={{height: '80px', 'marginRight': '10px'}} src={ photo.original }
                  key={ index }
                  onClick={ showGallery.bind(null, index + 1) } />
              ))
            }
          </div>
        </div>
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
          onClick={ discard.bind(null, activity._id) }>Dislike</div>
        <div className="ui basic green button"
          onClick={ shortlist.bind(null, activity._id) }>Shortlist</div>
      </div>
    </div>
  </div>
);

export default ActivityView;
