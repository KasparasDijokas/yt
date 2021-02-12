import React, { useState, useEffect, useContext } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './videos.scss';
import { Link } from 'react-router-dom';
import YoutubeContext from '../../YoutubeContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { youtube_key } from '../../keys';
import uuid from 'react-uuid'

const Videos = ({ videoId, userSearchHandler }) => {
  const [, setError] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(false);

  const [videos, setVideos] = useState([]);

  const { keyword } = useContext(YoutubeContext);

  useEffect(() => {
    setVideos([]);
    loadMoreVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const loadMoreVideos = () => {
    axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&${
        nextPageToken && `pageToken=${nextPageToken}`
      }&key=${youtube_key}`
      )
      .then((res) => {
        setVideos((prevVideos) => {
          return [...prevVideos, ...res.data.items];
        });
        setNextPageToken(res.data.nextPageToken);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (videos) {
    return (
      <div className="videos">
        <InfiniteScroll
          dataLength={videos.length}
          next={loadMoreVideos}
          hasMore={true}
          loader={<CircularProgress color="secondary" />}
          style={{
            overflow: 'hidden',
          }}
        >
          {videos.map((video) => {
            return (
              <Link
                to={{
                  pathname: `/watch/${video.id.videoId}`,
                  state: {
                    videoTitle: `${video.snippet.title}`,
                    description: `${video.snippet.description}}`,
                  },
                }}
                key={uuid()}
              >
                <VideoCard
                  image={video.snippet.thumbnails.high.url}
                  channelLogo={video.snippet.thumbnails.default.url}
                  videoTitle={video.snippet.title}
                  channelName={video.snippet.channelTitle}
                  description={video.snippet.description}
                  key={uuid()}
                />
              </Link>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Videos;
