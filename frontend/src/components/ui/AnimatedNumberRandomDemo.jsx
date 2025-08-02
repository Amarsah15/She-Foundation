import NumberFlow from "@number-flow/react";

const AnimatedNumberRandom = ({ value }) => {
  return (
    <span className="flex items-center justify-center gap-2">
      <NumberFlow
        value={value}
        className="text-5xl font-semibold"
        format={{ style: "currency", currency: "INR" }}
      />
    </span>
  );
};

export default AnimatedNumberRandom;
