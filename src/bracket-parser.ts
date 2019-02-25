/**
 * Parse bracket expression
 * @param {String} expression a path expression with brackets
 * @example > parseBracketExpression('hello[1]["world"]') returns { var: 'hello', brackets: [ 1, 'world'] }
 */
export default function bracketParser(expression: string) {
  const patterns = {
    // variable expression, eg. foo
    var: "[a-zA-Z_\\$][\\$\\w]*",

    // integer number, eg. 123
    number: "\\d+",

    // double quote string, eg. "foo"
    dquote: '\\"[\\$\\w]+\\"',

    // single quote string, eg. 'bar'
    squote: "\\'[\\$\\w]+\\'"
  };
  const regexSimple = new RegExp("^(|" + patterns.var + ")$");
  const matchSimple = expression.match(regexSimple);
  if (matchSimple) {
    return {
      var: matchSimple[1],
      brackets: []
    };
  }
  const innerExp = [patterns.number, patterns.dquote, patterns.squote].join(
    "|"
  );
  const bracketExp =
    "\\[((" + innerExp + ")(|(\\]\\s*\\[(" + innerExp + "))*))\\]";
  const regex = new RegExp("^(|" + patterns.var + ")" + bracketExp + "$");
  const match = expression.match(regex);
  if (match) {
    const evaluation = function(str: string) {
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
