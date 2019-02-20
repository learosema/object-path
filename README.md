# Get object property by path

[![Build Status](https://travis-ci.org/terabaud/object-path.svg?branch=master)](https://travis-ci.org/terabaud/object-path)

This method is inspired by https://github.com/skratchdot/object-path-get/blob/master/index.js but extended by array indexes.

Example:

```
const obj = {
  title: {
    name: 'Star Wars',
    year: '1977-2019',
    episodes: [
      {title: 'Episode I - The Phantom Menace', year: 1999},
      {title: 'Episode II - Attack of the Clones', year: 2002},
      {title: 'Episode III - Revenge of the Sith', year: 2005},
      {title: 'Episode IV - A New Hope', year: 1977},
      {title: 'Episode V - The Empire Strikes Back', year: 1980},
      {title: 'Episode VI - Return of The Yedi', year: 1983},
      {title: 'Episode VII - The Force Awakens', year: 2015},
      {title: 'Episode VIII - The Lase Jedi', year: 2017},
      {title: 'Episode IX', year: 2019}
    ]
  },
  people: [
    {name: 'Luke Skywalker', type: 'jedi' },
    {name: 'Darth Vader', type: 'sith'}
  ]
};

objectPathGet(obj, 'people[1].name'); // 'Darth Vader'
objectPathGet(obj, 'title.name'); // 'Star Wars'
objectPathGet(obj, 'title.episodes[3].title'); // 'Episode IV - A New Hope'
```
