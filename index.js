module.exports = function(obj, path, defaultValue) {
  if (path === null || typeof path === "undefined" || path === "") {
    return obj;
  }
  if (typeof path !== "string") {
    return defaultValue;
  }
  let iter = obj;
  const pathSegments = path.split(".");
  for (let i = 0; i < pathSegments.length; i++) {
    let prop = pathSegments[i];
    let bracketExpr = null;
    const matchBrackets = prop.match(/^([\$\w]+)\[(\w+)\]$/);
    if (matchBrackets) {
      prop = matchBrackets[1];
      bracketExpr = matchBrackets[2];
    }
    if (!iter || typeof iter !== "object" || !prop in iter) {
      return defaultValue;
    }
    iter = iter[prop];
    if (bracketExpr !== null && iter instanceof Array) {
      const parsedIdx = parseInt(bracketExpr, 10);
      if (!isNaN(parsedIdx)) {
        iter = iter[parsedIdx];
      } else {
        return defaultValue;
      }
    }
  }
  return iter || defaultValue;
};
