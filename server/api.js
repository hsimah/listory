const toSlugCase = require('to-slug-case');

class Api {
  constructor({
    db,
    name,
  }) {
    this.db = db;
    this.name = name;
  }

  get collection() {
    return this.db.getCollection(this.name) || this.db.addCollection(this.name);
  }

  add({ name, ...rest }) {
    const existing = this.collection.findOne({ name });
    if (existing != null) {
      // throw error
      return;
    }
    const slug = toSlugCase(name);
    const item = this.collection.insert({
      slug,
      name,
      ...rest,
    });
    this.db.saveDatabase();
    return item;
  }

  update({ name: _, slug, ...rest }) {
    const existing = this.collection.findOne({ slug });
    if (existing == null) {
      // throw error
      return;
    }

    Object.assign(existing, rest);
    this.db.saveDatabase();
    return existing;
  }

  getOne(params) {
    if (params == null) {
      return null;
    }

    const { id, slug } = params;
    const query = id != null ? { $loki: id } : { slug };

    return this.collection.findOne(query);
  }

  get(params) {
    if (params == null || Object.keys(params).length === 0) {
      return this.collection.find({ archived: { $ne: true } });
    }

    const { id, name, slug } = params;

    if (id != null) {
      const query = Array.isArray(id) ? { '$loki': { '$in': id } } : { '$loki': id };
      return this.collection.find({ $and: [{ archived: { $ne: true } }, query] });
    }

    if (slug != null) {
      return this.collection.chain()
        .find({ archived: { $ne: true } })
        .where((i) => i.slug.contains(params.slug));
    }

    if (name != null) {
      return this.collection.chain()
        .find({ archived: { $ne: true } })
        .where((i) => i.name.contains(params.name));
    }

    return [];
  }
}

module.exports = Api;