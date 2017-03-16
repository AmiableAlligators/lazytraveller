import React from 'react';

const ActivityView = ({ activity }) => {
  <div class="activity-container">
    <div class="activity-title">{ activity.title }</div>
    <div class="activity-img">
      <img src={ activity.url } alt="" />
    </div>
    <div class="activity-des">{ activity.description }</div>
    <div class="activity-dist">{ activity.dist }</div>
    <div class="activity-price">{ activity.price }</div>
    <button class="like"
      onClick={ () => handleLikeClick( true, activity.activityId ) }>Like
    </button>
    <button class="dis-like"
      onClick={ () => handleLikeClick( false, activity.activityId ) }>Dislike
    </button>
  </div>
};

export default ActivityView;
