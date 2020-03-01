const loki = require('lokijs');

class Api {
  constructor({
    name,
  }) {
    const config = {
      unique: ['name'],
      autoupdate: true,
    };

    this.db = new loki('./listory-db.json', {
      autosave: true,
      autosaveInterval: 5000,
      autoload: true,
      autoloadCallback: () => {
        this.collection = this.db.getCollection(name);
        if (this.collection == null) {
          this.collection = this.db.addCollection(name, config);
          this.db.addCollection(name);
        }
      },
    });
  }

  add({ name, ...list }) {
    const existing = this.collection.by('name', name);
    if (existing != null) {
      // throw error
      return;
    }

    const item = this.collection.insert({
      name,
      ...list,
    });
    this.db.saveDatabase();
    return item;
  }

  update({ name, ...list }) {
    const existing = this.collection.by('name', name);
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, list);
    this.db.saveDatabase();
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