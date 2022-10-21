import "./App.css";
import Matrix from "./components/matrix";
import React, { useState, useRef, useEffect } from "react";
import {
  connectUser,
  getUserProfile,
  getGameScore,
} from "./services/user.service";
import { useAuth0 } from "@auth0/auth0-react";
import { getGameData } from "./services/matrix.service";

function App() {
  const [gameData, setGameData] = useState();
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const loadInit = async () => {
      try {
        const userData = await getUserProfile();
        const gameData = await getGameData();
        setGameData({ ...gameData, connectedUser: userData });
      } catch (error) {
        console.error("Cannot find user");
        return;
      }
    };
    if (isAuthenticated && user) {
      console.log(user.name);
      connectUser(user.name).then(loadInit);
    }
  }, [isAuthenticated]);

  const showScore = async () => {
    const scores = await getGameScore();
    const userData = await getUserProfile();
    setGameData({
      ...gameData,
      connectedUser: userData,
      scores: { data: scores, isVisible: true },
    });
  };

  console.log(user);

  return (
    <div className="App">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : gameData && gameData.connectedUser ? (
        <>
          <div className="bg-blue-200">
            <h1 className="text-[30px] font-bold text-center">My MOTUS APP</h1>
            <h2 className="fixed top-0 right-5">
              {gameData.connectedUser.username}
              <br />
              Score: {gameData.connectedUser.score} Pt.
            </h2>
          </div>
          {gameData.scores &&
          gameData.scores.isVisible &&
          gameData.scores.data &&
          gameData.scores.data.length ? (
            <div className="w-[400px] mt-4 mx-auto">
              <table className=" border-4 border-gray-600 bg-blue-200">
                <tr>
                  <th>Rank #</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
                {gameData.scores.data.map((d, i) => (
                  <tr>
                    <td>{i}</td>
                    <td>{d.username}</td>
                    <td>{d.score}</td>
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <Matrix size={gameData.length} showScore={showScore}></Matrix>
          )}
        </>
      ) : (
        <div className="bg-blue-200 mx-auto w-[200px] px-4 mt-4 flex flex-col align-middle">
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-400 text-white p-2 m-2"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
