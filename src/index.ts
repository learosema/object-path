import bracketParser from "./bracket-parser";

export default function objectPathGet(
  obj: any,
  path?: string | null,
  defaultValue?: string
): any {
  if (path === null || typeof path === "undefined" || path === "") {
    return obj;
  }
  if (typeof path !== "string") {
    return defaultValue;
  }
  let iter: any = obj;
  const pathSegments: Array<string> = path.split(".");
  for (let i = 0; i < pathSegments.length; i++) {
    let expr = bracketParser(pathSegments[i]);
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
    for (let j = 0; j < expr.brackets.length; j++) {
      let prop: string | number = expr.brackets[j];
      if (!iter || typeof iter !== "object" || !(prop in iter)) {
        return defaultValue;
      }
      iter = iter[prop];
    }
  }

  return iter || defaultValue;
}
