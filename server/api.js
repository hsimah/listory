const loki = require('lokijs');

const db = new loki('./listory-db.json', { autosave: true, autosaveInterval: 5000, autoload: true });

// var db = new loki("quickstart.db", {
//   autoload: true,
//   autoloadCallback : databaseInitialize,
//   autosave: true, 
//   autosaveInterval: 4000
// });

// function databaseInitialize() {
//   if (!db.getCollection("users")) {
//     db.addCollection("users");
//   }
// }

class Api {
  constructor({
    name,
  }) {
    const config = {
      unique: ['name'],
      autoupdate: true,
    };
    this.collection = db.getCollection(name) || db.addCollection(name, config);
  }

  add({ name, ...list }) {
    const existing = this.collection.by('name', name);
    if (existing != null) {
      // throw error
      return;
    }

    return this.collection.insert({
      name,
      ...list,
    });
  }

  update({ name, ...list }) {
    const existing = this.collection.by('name', name);
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, list);
    return existing;
  }

  getOne({ name }) {
    return this.collection.by('name', name);
  }

  get(params) {
    return params != null ? this.collection.find(params) : this.collection.data;
  }
}

module.exports = Api;