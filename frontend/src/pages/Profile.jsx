import React from "react";
import { useAuthStore } from "../stores/useAuthStore.js";
import AnimatedNumberRandom from "../components/AnimatedNumberRandomDemo.jsx";
import Nav from "../components/Nav.jsx";

const Profile = () => {
  const { authUser } = useAuthStore();
  const user = authUser;

  return (
    <div className="mx-auto p-4">
      <Nav />
      <div className="min-h-screen px-4 py-10 bg-base-100 text-base-content">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture & Name */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <img
              src={user.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="font-semibold text-lg">{user.email}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Raised */}
            <div className="card bg-base-200 border border-success shadow-lg rounded-2xl p-6 transition-transform hover:scale-105 ">
              <p className="text-xs font-bold text-primary uppercase tracking-widest flex items-center mb-2">
                <span className="text-xl mr-2">💰</span> Amount Raised
              </p>
              <p className="text-3xl font-extrabold text-success">
                <AnimatedNumberRandom value={user.amountRaised || 0} />
              </p>
            </div>

            {/* Referral Code */}
            <div className="card bg-base-200 border border-accent shadow-md rounded-2xl p-6 transition-transform hover:scale-105">
              <p className="text-xs font-bold text-accent uppercase tracking-widest flex items-center mb-2">
                <span className="text-xl mr-2">🎁</span> Referral Code
              </p>
              <p className="text-2xl font-extrabold text-base-content select-all m-auto">
                {user.referralCode}
              </p>
            </div>

            {/* Referral Count */}
            <div className="card bg-base-200 border border-info shadow-md rounded-2xl p-6 transition-transform hover:scale-105">
              <p className="text-xs font-bold text-info uppercase tracking-widest flex items-center mb-2">
                <span className="text-xl mr-2">👥</span> Referral Count
              </p>
              <p className="text-2xl font-extrabold text-base-content m-auto">
                {user.referralCount}
              </p>
            </div>

            <div className="card bg-base-200 border border-info shadow-md rounded-2xl p-6 transition-transform hover:scale-105">
              <p className="text-xs font-bold text-info uppercase tracking-widest flex items-center mb-2">
                <span className="text-xl mr-2">👥</span> Admin
              </p>
              <p className="text-2xl font-extrabold text-base-content m-auto">
                {user.isAdmin ? "Yes" : "No"}
              </p>
            </div>

            {/* Bio */}
            <div className="card bg-base-200 border border-base-300 shadow-inner rounded-2xl p-6 md:col-span-2 mt-2">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center">
                <span className="text-xl mr-2">📝</span> Bio
              </p>
              <p className="text-lg font-medium text-base-content">
                {user.bio || "No bio provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
