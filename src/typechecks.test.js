import objectPathGet from "./index";

const obj = { foo: "bar" };

// Type checks are necessary when the module is used in a non-TypeScript environment
test("returns the specified default value if the provided path is not a string", () => {
  expect(objectPathGet(obj, [], "N/A")).toBe("N/A");
  expect(objectPathGet(obj, {}, "N/A")).toBe("N/A");
  expect(objectPathGet(obj, x => x, "N/A")).toBe("N/A");
});
