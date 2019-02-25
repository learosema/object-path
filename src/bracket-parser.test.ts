import bracketParser from "./bracket-parser";

test("parses single quote expressions", () => {
  expect(bracketParser("foo['bar']")).toEqual({
    var: "foo",
    brackets: ["bar"]
  });
  expect(bracketParser("['foo']['bar']")).toEqual({
    var: "",
    brackets: ["foo", "bar"]
  });
});

test("parses double quote expressions", () => {
  expect(bracketParser('foo["bar"]')).toEqual({
    var: "foo",
    brackets: ["bar"]
  });
  expect(bracketParser('["foo"]["bar"]')).toEqual({
    var: "",
    brackets: ["foo", "bar"]
  });
});

test("parses decimal expressions", () => {
  expect(bracketParser("foo[1]")).toEqual({ var: "foo", brackets: [1] });
  expect(bracketParser("[3][4]")).toEqual({ var: "", brackets: [3, 4] });
});

test("empty expressions are invalid", () => {
  expect(bracketParser("foo[]")).toBe(null);
  expect(bracketParser('foo[""]')).toBe(null);
  expect(bracketParser("foo['']")).toBe(null);
});

test("negative indices are invalid", () => {
  expect(bracketParser("foo[-1]")).toBe(null);
});

test("variable names starting with numbers are invalid", () => {
  expect(bracketParser("00data")).toBe(null);
});
