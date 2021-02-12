import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import youtubeLogo from '../../images/youtube-logo.png';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = ({ userSearchHandler }) => {
  const [searchbarState, setSearchBarState] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);

  const validate = (input) => {
    // validate user input
    const letters = /^[a-zA-Z0-9 ]*$/;
    input.match(letters) && input.length < 20
      ? userSearchHandler(userInput)
      : setError(true);

    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  // toggle search bar state
  const showSearchbar = () => {
    setSearchBarState((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="header">
      <div className={`header__left ${!searchbarState && `hide`}`}>
        <MenuIcon className="bars" />
        <Link to="/">
          <img src={youtubeLogo} alt="youtube" className="youtube__image" />
        </Link>
      </div>

      <div className={`header__center ${!searchbarState && `show`}`}>
        <div className="header__center__inputContainer">
          <ArrowBackIcon
            className={`arrow__icon ${!searchbarState && `show`}`}
            onClick={() => showSearchbar()}
          />
          <input
            type="text"
            className="textField"
            placeholder="Search"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                validate(userInput);
              }
            }}
          />
          <SearchIcon
            onClick={() => validate(userInput)}
            className="header__searchBtn"
          />
          <p className={error ? `error show` : `error`}>
            Only letters and numbers are allowed. Search term cannot be longer
            than 20 characters.
          </p>
        </div>
      </div>

      <div className={`header__right ${!searchbarState && `hide`}`}>
        <SearchIcon
          className="searchBtn__mobile"
          onClick={() => showSearchbar()}
        />
        <VideoCallIcon />
        <AppsIcon />
        <NotificationsIcon />
        <Avatar alt="Cindy Baker"/>
      </div>
    </div>
  );
};

export default Header;
