import Nav from "../components/Nav.jsx";
import AnimatedNumberRandom from "../components/AnimatedNumberRandomDemo.jsx";
import { useAuthStore } from "../stores/useAuthStore.js";
import toast from "react-hot-toast";

const REWARDS = [
  {
    amount: 1000,
    title: "🎁 Digital Certificate",
  },
  {
    amount: 5000,
    title: "🎉 Exclusive Merch",
  },
  {
    amount: 10000,
    title: "🏆 Special Website Mention",
  },
  {
    amount: 25000,
    title: "🚀 Blog Feature + Shoutout",
  },
];

const Dashboard = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="mx-auto p-4">
      <Nav />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Intern Info */}
          <div className="bg-base-200 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Intern Name</h2>
            <p className="text-lg">{authUser?.name}</p>
          </div>

          {/* Referral Code */}
          <div className="bg-base-200 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Referral Code</h2>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono">
                {authUser?.referralCode}
              </span>
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => {
                  navigator.clipboard.writeText(authUser?.referralCode);
                  toast.success("Referral code copied to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Total Donations */}
        <div className="bg-success text-white p-6 rounded-2xl mb-8 text-center shadow-lg">
          <h2 className="text-2xl font-semibold">Total Donations</h2>
          <p className="text-4xl mt-2 font-bold">
            <AnimatedNumberRandom value={authUser?.amountRaised || 0} />
          </p>
        </div>

        {/* Rewards / Unlockables */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🎯 Rewards & Unlockables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REWARDS.map((reward, i) => {
              const amt = authUser?.amountRaised || 0;

              let badge;
              if (amt >= reward.amount) {
                badge = (
                  <div className="badge badge-success mt-2">Unlocked</div>
                );
              } else if (
                // First locked reward after current amount = Coming Soon
                amt < reward.amount &&
                (i === 0 || amt >= REWARDS[i - 1].amount)
              ) {
                badge = (
                  <div className="badge badge-warning mt-2">Coming Soon</div>
                );
              } else {
                badge = <div className="badge badge-error mt-2">Locked</div>;
              }

              return (
                <div
                  key={i}
                  className="card bg-base-300 shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="card-body items-center text-center">
                    <h3 className="card-title text-lg">
                      ₹{reward.amount.toLocaleString()}
                    </h3>
                    <p>{reward.title}</p>
                    {badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
