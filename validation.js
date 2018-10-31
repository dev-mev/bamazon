module.exports = {
  validateText: (input) => {
    if (input != null && input.trim() !== "") {
      return true;
    }
    console.log("\nInvalid input");
    return false;
  },

  validateNumeric: (value) => {
    if (!isNaN(value) && value !== "") {
      return true;
    }
    console.log("\nInvalid number");
    return false;
  }
};
