const toSlugCase = require('to-slug-case');

class Api {
  constructor({
    name,
  }) {
    this.name = name;
  }

  _collection(db) {
    return db.getCollection(this.name) || db.addCollection(this.name);
  }

  add(database, { name, ...rest }) {
    const existing = this._collection(database).findOne({ name });
    if (existing != null) {
      // throw error
      return;
    }
    const slug = toSlugCase(name);
    const item = this._collection(database).insert({
      slug,
      name,
      ...rest,
    });
    database.saveDatabase();
    return item;
  }

  update(database, { name: _, slug, ...rest }) {
    const existing = this._collection(database).findOne({ slug });
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, rest);
    database.saveDatabase();
    return existing;
  }

  delete(database, { slug }) {
    const existing = this._collection(database).findOne({ slug });
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, { archived: true });
    database.saveDatabase();
    return {
      $loki: existing.$loki,
      archived: true,
    };
  }

  getOne(database, params) {
    if (params == null) {
      return null;
    }

    const { id, slug } = params;
    const query = id != null ? { $loki: id } : { slug };

    return this._collection(database).findOne(query);
  }

  get(database, params) {
    if (params == null || Object.keys(params).length === 0) {
      return this._collection(database).find({ archived: { $ne: true } });
    }

    const { id, name, slug } = params;

    if (id != null) {
      const query = Array.isArray(id) ? { '$loki': { '$in': id } } : { '$loki': id };
      return this._collection(database).find({ $and: [{ archived: { $ne: true } }, query] });
    }

    if (slug != null) {
      return this._collection(database).chain()
        .find({ archived: { $ne: true } })
        .where((i) => i.slug.contains(params.slug));
    }

    if (name != null) {
      return this._collection(database).chain()
        .find({ archived: { $ne: true } })
        .where((i) => i.name.contains(params.name));
    }

    return [];
  }
}

module.exports = Api;