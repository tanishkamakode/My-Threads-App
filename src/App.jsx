import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";

const App = () => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header user={user} />
          <Feed />
          {/* <PopUp /> */}
        </div>
      )}
    </>
  );
};

export default App;
