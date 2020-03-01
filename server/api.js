const loki = require('lokijs');

const db = new loki('listory.db');

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
    return this.collection.find(params);
  }
}

module.exports = Api;