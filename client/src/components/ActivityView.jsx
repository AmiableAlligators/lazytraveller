import React from 'react';

const ActivityView = (props) => {
  <div class="activity-container">
    <div class="activity-title">{ props.activity.title }</div>
    <div class="activity-img">
      <img src={ props.activity.url } alt="" />
    </div>
    <div class="activity-des">{ props.activity.description }</div>
    <div class="activity-dist">{ props.activity.dist }</div>
    <div class="activity-price">{ props.activity.price }</div>
    <button class="like"
      onClick={ () => handleLikeClick( true, props.activity.activityId ) }>Like
    </button>
    <button class="dis-like"
      onClick={ () => handleLikeClick( false, props.activity.activityId ) }>Dislike
    </button>
  </div>
};

export default ActivityView;
