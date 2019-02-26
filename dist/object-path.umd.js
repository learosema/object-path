(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.objectPathGet = factory()));
})(this, function() {
  "use strict";

  /**
   * Parse bracket expression
   * @param {String} expression a path expression with brackets
   * @example > parseBracketExpression('hello[1]["world"]') returns { var: 'hello', brackets: [ 1, 'world'] }
   */
  function bracketParser(expression) {
    var patterns = {
      // variable expression, eg. foo
      var: "[a-zA-Z_\\$][\\$\\w]*",
      // integer number, eg. 123
      number: "\\d+",
      // double quote string, eg. "foo"
      dquote: '\\"[\\$\\w]+\\"',
      // single quote string, eg. 'bar'
      squote: "\\'[\\$\\w]+\\'"
    };
    var regexSimple = new RegExp("^(|" + patterns.var + ")$");
    var matchSimple = expression.match(regexSimple);
    if (matchSimple) {
      return {
        var: matchSimple[1],
        brackets: []
      };
    }
    var innerExp = [patterns.number, patterns.dquote, patterns.squote].join(
      "|"
    );
    var bracketExp =
      "\\[((" + innerExp + ")(|(\\]\\s*\\[(" + innerExp + "))*))\\]";
    var regex = new RegExp("^(|" + patterns.var + ")" + bracketExp + "$");
    var match = expression.match(regex);
    if (match) {
      var evaluation = function(str) {
        return new RegExp("^" + patterns.number + "$").test(str)
          ? parseInt(str, 10)
          : str.slice(1, -1);
      };
      return {
        var: match[1],
        brackets: match[2].split(/\]\s*\[/).map(evaluation)
      };
    }
    return null;
  }

  function objectPathGet(obj, path, defaultValue) {
    if (path === null || typeof path === "undefined" || path === "") {
      return obj;
    }
    if (typeof path !== "string") {
      return defaultValue;
    }
    var iter = obj;
    var pathSegments = path.split(".");
    for (var i = 0; i < pathSegments.length; i++) {
      var expr = bracketParser(pathSegments[i]);
      if (expr === null || (i > 0 && expr.var === "")) {
        console.error("invalid expression: ", path, pathSegments[i]);
        return defaultValue;
      }
      if (expr.var !== "") {
        if (!iter || typeof iter !== "object" || !(expr.var in iter)) {
          return defaultValue;
        }
        iter = iter[expr.var];
      }
      for (var j = 0; j < expr.brackets.length; j++) {
        var prop = expr.brackets[j];
        if (!iter || typeof iter !== "object" || !(prop in iter)) {
          return defaultValue;
        }
        iter = iter[prop];
      }
    }
    return iter || defaultValue;
  }

  return objectPathGet;
});
