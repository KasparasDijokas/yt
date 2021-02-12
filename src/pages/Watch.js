import React, { useContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './watch.scss';
import VideoCard from '../components/VideoCard/VideoCard';
import { Link } from 'react-router-dom';
import YoutubeContext from '../YoutubeContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { youtube_key } from '../keys';
import axios from 'axios';
import { animateScroll } from 'react-scroll';
import uuid from 'react-uuid'

const opts = {
  height: '165',
  width: '280',
  playerVars: {
    autoplay: 1,
  },
};

const Watch = (props) => {
  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const videoId = props.match.params.id;
  const { videoTitle, description } = props.location.state;
  const [, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(false);
  const { keyword } = useContext(YoutubeContext);

  useEffect(() => {
    scrollToTop();
  }, [videoId]);

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
      <div className="watch">
        <div className="watch__playerContainer">
          <YouTube videoId={videoId} opts={opts} className="watch__player" />
          <div className="watch__playerDescription">
            <h3>{videoTitle}</h3>
            <hr />
            <p>{description}</p>
          </div>
        </div>

        <div className="watch__videosContainer">
          <h1>Search results</h1>
          <InfiniteScroll
            dataLength={videos.length}
            next={loadMoreVideos}
            hasMore={true}
            loader={<CircularProgress color="secondary" />}
            style={{
              overflow: 'hidden',
            }}
          >
            {videos &&
              videos.map((video) => {
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
                      image={video.snippet.thumbnails.default.url}
                      channelLogo={video.snippet.thumbnails.default.url}
                      videoTitle={video.snippet.title}
                      channelName={video.snippet.channelTitle}
                      key={uuid()}
                    />
                  </Link>
                );
              })}
          </InfiniteScroll>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Watch;
