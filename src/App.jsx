import { useState, useEffect, useSyncExternalStore } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import WriteIcon from "./components/WriteIcon";
import PopUp from "./components/PopUp";

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(null);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [interactingThread, setInteractingThread] = useState(null);
  const [popUpFeedThreads, setPopUpFeedThreads] = useState(null);
  const [text, setText] = useState(null);

  const userId = "c33a9136-8410-4203-ae71-dbcfa4d3d0f1";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreads = async () => {
    const response = await fetch(
      `http://localhost:3000/threads?thread_from=${userId}`
    );
    const data = await response.json();
    setThreads(data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(
        (thread) => thread.reply_to === null
      );
      setFilteredThreads(standAloneThreads);
    }

    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(
        (thread) => thread.reply_to !== null
      );
      setFilteredThreads(replyThreads);
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to${interactingThread}?.id`
      );
      const data = await response.json();
      setPopUpFeedThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postThread = async () => {
    const thread = {
      timestamp: new Date(),
      thread_from: user.user_uuid,
      thread_to: user.user_uuid || null,
      reply_to: interactingThread?.id || null,
      text: text,
      likes: [
        {
          uuid: "132c0172-6771-4268-96de-f3d803251059",
        },
        {
          user_uuid: "c33a9136-8410-4203-ae71-dbcfa4d3d0f1",
        },
      ],
    };
    try {
      const response = await fetch("http://localhost:3000/threads", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(thread),
      });
      const result = await response.json();
      console.log("RESULT : ", result);
      getThreads();
      getReplies();
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  useEffect(() => {
    getReplies();
  }, [interactingThread]);

  const handleClick = () => {
    setPopUpFeedThreads(null);
    setInteractingThread(null);
    setOpenPopUp(true);
  };

  // console.log(user);
  // console.log(threads);
  // console.log(viewThreadsFeed);
  // console.log(filteredThreads);
  // console.log("Current : ", interactingThread);

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            filteredThreads={filteredThreads}
            setOpenPopUp={setOpenPopUp}
            getThreads={getThreads}
            setInteractingThread={setInteractingThread}
          />
          {openPopUp && (
            <PopUp
              user={user}
              setOpenPopUp={setOpenPopUp}
              popUpFeedThreads={popUpFeedThreads}
              text={text}
              setText={setText}
              postThread={postThread}
            />
          )}
          <div onClick={handleClick}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
