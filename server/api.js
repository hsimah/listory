const loki = require('lokijs');

class Api {
  constructor({
    name,
  }) {
    const config = {
      unique: ['name', 'slug'],
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

  getOne(params) {
    if (params == null) {
      return null;
    }

    const { id, slug } = params;
    if (id != null) {
      return this.collection.findOne(id);
    }
    return this.collection.findOne({ 'slug': slug });
  }

  get(params) {
    if (params == null || Object.keys(params).length === 0) {
      return this.collection.data;
    }

    const { id, name, slug } = params;

    if (id != null) {
      const query = Array.isArray(id) ? {'$loki': {'$in': id}} :{ '$loki': id };
      return this.collection.find(query);
    }

    if (slug != null) {
      return this.collection.where((i) => i.slug.contains(params.slug));
    }

    if (name != null) {
      return this.collection.where((i) => i.name.contains(params.name));
    }

    return [];
  }
}

module.exports = Api;