import logo from "./logo.svg";
import "./App.css";
import Matrix from "./components/matrix";
import React, { useState, useRef, useEffect } from "react";
import { connectUser, getUserProfile } from "./services/user.service";

const MATRIX_SIZE = 6;

function App() {
  const [connectedUser, setConnectedUser] = useState();
  const userInputRef = useRef();

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        if (data && data.username) {
          setConnectedUser(data);
        }
      })
      .catch(() => console.error("Cannot find user"));
  }, []);

  const updateUser = async () => {
    if (!userInputRef || !userInputRef.current || !userInputRef.current.value) {
      // eslint-disable-next-line no-undef
      alert("Please provide your username");
      return;
    }

    const updatedUser = await connectUser(userInputRef.current.value);
    console.log(updatedUser);
    if (!updatedUser || !updatedUser.username) {
      // eslint-disable-next-line no-undef
      alert("Cannot update user");
      return;
    }
    setConnectedUser(updatedUser);
  };

  return (
    <div className="App">
      {connectedUser ? (
        <>
          <div className="bg-blue-200">
            <h1 className="text-[30px] font-bold text-center">My MOTUS APP</h1>
            <h2 className="fixed top-0 right-5">test</h2>
          </div>
          <Matrix size={MATRIX_SIZE}></Matrix>
        </>
      ) : (
        <div className="bg-blue-200 mx-auto w-[200px] px-4 mt-4 flex flex-col align-middle">
          <h1>User Name:</h1>
          <input ref={userInputRef} />
          <button
            onClick={() => updateUser()}
            className="bg-blue-400 text-white p-2 m-2"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
