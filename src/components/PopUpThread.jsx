import React from "react";
import moment from "moment";

const PopUpThread = ({ user, PopUpFeedThread }) => {
  const timePassed = moment()
    .startOf("day")
    .fromNow(PopUpFeedThread?.timestamp);
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user.img} alt="Profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user.handle}</strong>
            </p>
            <p>{PopUpFeedThread?.text}</p>
          </div>
        </div>
        <p className="sub-text">{timePassed} ago</p>
      </div>
    </article>
  );
};

export default PopUpThread;
