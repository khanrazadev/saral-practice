const getBorderColor = (statusName) => {
  switch (statusName) {
    case "prospects":
      return "border-yellow-400";
    case "reached out":
      return "border-purple-400";
    case "in conversation":
      return "border-sky-400";
    case "onboarded":
      return "border-emerald-400";
    case "rejected":
      return "border-red-400";
    default:
      return "border-gray-500";
  }
};

export default getBorderColor;
