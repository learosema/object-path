const objectPathGet = require("./index.js");

const obj = {
  title: {
    name: "Star Wars",
    year: "1977-2019",
    episodes: [
      { title: "Episode I - The Phantom Menace", year: 1999 },
      { title: "Episode II - Attack of the Clones", year: 2002 },
      { title: "Episode III - Revenge of the Sith", year: 2005 },
      { title: "Episode IV - A New Hope", year: 1977 },
      { title: "Episode V - The Empire Strikes Back", year: 1980 },
      { title: "Episode VI - Return of The Yedi", year: 1983 },
      { title: "Episode VII - The Force Awakens", year: 2015 },
      { title: "Episode VIII - The Last Jedi", year: 2017 },
      { title: "Episode IX", year: 2019 }
    ]
  },
  people: [
    { name: "Luke Skywalker", type: "jedi" },
    { name: "Darth Vader", type: "sith" }
  ]
};

test("returns the specified default value if the object is null or undefined", () => {
  expect(objectPathGet(null, "people[1].name", "N/A")).toBe("N/A");
});

test("returns the object itself if the path is null or empty", () => {
  expect(objectPathGet(obj, "")).toBe(obj);
  expect(objectPathGet(obj, null)).toBe(obj);
  expect(objectPathGet(obj)).toBe(obj);
});

test("gets object property by name from object", () => {
  expect(objectPathGet(obj, "people")).toBe(obj.people);
  expect(objectPathGet(obj, "title.name")).toBe("Star Wars");
  expect(objectPathGet(obj, "title.year")).toBe("1977-2019");
});

test("gets object property by only using brackets notation", () => {
  expect(objectPathGet(obj, '["people"]')).toBe(obj.people);
  expect(objectPathGet(obj, "['people'][1]['name']")).toBe("Darth Vader");
  expect(objectPathGet(obj, "['people'][1][\"name\"]")).toBe("Darth Vader");
});

test("gets object by array index", () => {
  expect(objectPathGet(obj, "people[1]")).toBe(obj.people[1]);
});

test("gets object property by using an array index in path", () => {
  expect(objectPathGet(obj, "people[1].name")).toBe(obj.people[1].name);
  expect(objectPathGet(obj, "title.episodes[3].title")).toBe(
    "Episode IV - A New Hope"
  );
  expect(objectPathGet(obj, "title.episodes[6]['title']")).toBe(
    "Episode VII - The Force Awakens"
  );
});

test("returns the specified default value if property does not exist", () => {
  expect(objectPathGet(obj, "people[1].age", "N/A")).toBe("N/A");
});

test("returns the specified default value if the provided bracket expression is an index out of range or undefined property", () => {
  expect(objectPathGet(obj, "people[5]", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, "people[-1]", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, "people[1]['hairColor']", "N/A")).toBe("N/A");
});

test("returns the specified default value if the provided array index not a number", () => {
  expect(objectPathGet(obj, "people[o]", "N/A")).toBe("N/A");
});

test("returns the specified default value when trying to get a property of undefined", () => {
  expect(objectPathGet(obj, "people[5].name", "N/A")).toBe("N/A");
});

test("returns the specified default value when a property of a non-object type is requested", () => {
  expect(objectPathGet(obj, "people[0].name.constructor", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, "title.name.toString", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, "title.name['toString']", "N/A")).toBe("N/A");
});

test("returns the specified default value when the provided path string is invalid", () => {
  expect(objectPathGet(obj, "people.1", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, "people.[0]", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, [], "N/A")).toBe("N/A");
  expect(objectPathGet(obj, "...", "N/A")).toBe("N/A");
  expect(objectPathGet(obj, '%§$R"$[2].§!$""§', "N/A")).toBe("N/A");
});
