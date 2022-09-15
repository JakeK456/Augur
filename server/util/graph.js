const convertLabelToTimeSpan = (label) => {
  switch (label) {
    case "1D":
      return { multiplier: 15, time: "minute", subtract: 1, span: "days" };
    case "5D":
      return { multiplier: 1, time: "hour", subtract: 5, span: "days" };
    case "1M":
      return { multiplier: 1, time: "day", subtract: 1, span: "months" };
    case "6M":
      return { multiplier: 1, time: "day", subtract: 6, span: "months" };
    case "1Y":
      return { multiplier: 1, time: "day", subtract: 1, span: "years" };
    case "5Y":
      return { multiplier: 2, time: "day", subtract: 5, span: "years" };
    default:
      return { multiplier: 2, time: "day", subtract: 15, span: "years" };
  }
};

const setLineColor = (array) => {
  const red = "#EA4335";
  const green = "#34A853";
  if (array[0] < array[array.length - 1]) return green;
  return red;
};

module.exports = {
  convertLabelToTimeSpan,
  setLineColor,
};
