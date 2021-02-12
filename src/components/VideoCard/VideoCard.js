import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './videoCard.scss';

const VideoCard = ({
  image,
  channelLogo,
  videoTitle,
  channelName,
  description
}) => {

  return (
    <div className={`videoCard`}>

      <div className="videoCard__imageContainer">
        <img src={image} alt={videoTitle} className="videoCard__image" />
      </div>

      <div className="videoCard__body">
        <div className="videoCard__videoTitle">
          <Avatar
            src={channelLogo}
            alt="channel logo"
            className="videoCard__avatar"
          />
          <p>{videoTitle}</p>
        </div>
        <p className="videoCard__channelName">{channelName}</p>
        <div className="videoCard__description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
