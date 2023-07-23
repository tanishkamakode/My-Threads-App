import React from "react";

const Header = ({ user }) => {
  const {
    bio,
    followers,
    handle,
    id,
    img,
    instagram_url,
    link,
    user_uuid,
    username,
  } = user;

  return (
    <header>
      <div className="info-container">
        <div className="user-info-container">
          <h1>{username}</h1>
          <p>
            {handle} <span className="threads-info">threads.net</span>
          </p>
        </div>
        <div className="img-container">
          <img src={img} alt="profile avatar" />
        </div>
      </div>
      <p>{bio}</p>
      <div className="sub-info-container">
        <p className="sub-text">
          {followers.length} followers • <a href={link}>{link.slice(8)}</a>
        </p>
      </div>
      <button
        className="primary"
        onClick={() => navigator.clipboard.writeText("I am a URL")}
      >
        Share Profile
      </button>
      <div className="button-container">
        <button>Threads</button>
        <button>Replies</button>
      </div>
    </header>
  );
};

export default Header;
