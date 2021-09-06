const toSlugCase = require('to-slug-case');

class Api {
  static init({ database, modules }) {
    return modules.map((m) => new Api({ name: m, database }));
  }

  constructor({
    name,
    database,
  }) {
    this.name = name;
    this.database = database;
  }

  _collection() {
    return this.database.getCollection(this.name) || this.database.addCollection(this.name);
  }

  add({ name, ...rest }) {
    const existing = this._collection().findOne({ name });
    if (existing != null) {
      return existing;
    }
    const slug = toSlugCase(name);
    const item = this._collection().insert({
      slug,
      name,
      ...rest,
    });
    this.database.saveDatabase();
    console.log('[api:add]', item);
    return item;
  }

  update({ name: _, slug, ...rest }) {
    const existing = this._collection().findOne({ slug });
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, rest);
    this.database.saveDatabase();
    return existing;
  }

  delete({ slug }) {
    const existing = this._collection().findOne({ slug });
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, { archived: true });
    this.database.saveDatabase();
    return {
      $loki: existing.$loki,
      archived: true,
    };
  }

  getOne(params) {
    if (params == null) {
      return null;
    }

    const { id, slug } = params;
    const query = id != null ? { $loki: id } : { slug };

    return this._collection().findOne(query);
  }

  get(params) {
    if (params == null || Object.keys(params).length === 0) {
      return this._collection().find({ archived: { $ne: true } });
    }

    const { id, name, slug } = params;

    if (id != null) {
      const query = Array.isArray(id) ? { '$loki': { '$in': id } } : { '$loki': id };
      return this._collection().find({ $and: [{ archived: { $ne: true } }, query] });
    }

    if (slug != null) {
      return this._collection().chain()
        .find({ archived: { $ne: true } })
        .where((i) => i.slug.contains(params.slug));
    }

    if (name != null) {
      return this._collection().chain()
        .find({ archived: { $ne: true } })
        .where((i) => i.name.contains(params.name));
    }

    return [];
  }
}

module.exports = Api;