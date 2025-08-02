import React, { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore.js";
import Nav from "../components/Nav.jsx";

const LeaderBoard = () => {
  const { getLeaderboard, leaderboardData } = useAuthStore();

  const length = leaderboardData.length - 1;

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <div className="mx-auto p-4">
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-primary">
          🏆 Top Leaderboard
        </h1>

        <div className="overflow-x-auto border-2 shadow-lg rounded-2xl bg-base-100">
          <table className="table w-full">
            <thead className="bg-base-300 text-base text-color-info-content font-semibold border-b-2">
              <tr>
                <th className="py-3">Rank</th>
                <th className="py-3">Name</th>
                <th className="py-3">Total Donations</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr
                  key={user._id}
                  className="bg-base-100 hover:bg-base-300 transition-all duration-200"
                >
                  <td className={`py-3 text-lg font-medium  ${
                      index < length ? "border-b-2" : ""
                    }`}>
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>
                  <td className={`py-3  ${
                      index < length ? "border-b-2" : ""
                    }`}>{user.name}</td>
                  
                  <td
                    className={`py-3 font-semibold  ${
                      index < length ? "border-b-2" : ""
                    }`}
                  >
                    {user.amountRaised}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
