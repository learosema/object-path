const bracketParser = require("./bracket-parser");

function objectPathGet(obj, path, defaultValue) {
  if (path === null || typeof path === "undefined" || path === "") {
    return obj;
  }
  if (typeof path !== "string") {
    return defaultValue;
  }
  let iter = obj;
  const pathSegments = path.split(".");
  for (let i = 0; i < pathSegments.length; i++) {
    let expr = bracketParser(pathSegments[i]);
    if (expr === null || (i > 0 && expr.var === "")) {
      console.error("invalid expression: ", path, pathSegments[i]);
      return defaultValue;
    }
    if (expr.var !== "") {
      if (!iter || typeof iter !== "object" || !expr.var in iter) {
        return defaultValue;
      }
      iter = iter[expr.var];
    }
    for (let j = 0; j < expr.brackets.length; j++) {
      let prop = expr.brackets[j];
      if (!iter || typeof iter !== "object" || !prop in iter) {
        return defaultValue;
      }
      iter = iter[prop];
    }
  }
  return iter || defaultValue;
}

module.exports = objectPathGet;
