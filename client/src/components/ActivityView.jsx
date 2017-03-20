import React from 'react';

const ActivityView = ({ activity, handleLikeClick }) => (
  <div className="activity-container">
    <div className="activity-title">{ activity.name }</div>
    <div className="activity-img">
      <img src={ activity.image } alt="" />
    </div>
    <div className="activity-des">{ activity.description }</div>
    <div className="activity-dist">{ activity.dist }</div>
    <div className="activity-price">{ activity.price }</div>
    <button className="like"
      onClick={ () => { handleClick( true, activity.id ) } }>Like
    </button>
    <button className="dislike"
      onClick={ () => { handleClick( false, activity.id ) } }>Dislike
    </button>
  </div>
);

export default ActivityView;
// class ActivityView extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
      
//     }
//   }
// }
