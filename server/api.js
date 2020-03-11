const loki = require('lokijs');
const toSlugCase = require('to-slug-case');

const mem = new loki.LokiMemoryAdapter();

class Api {
  constructor({
    name,
  }) {
    const config = {
      unique: ['name', 'slug'],
      autoupdate: true,
    };

    try {
      this.db = new loki(`listory-${Date.now()}.json`, {
        adapter: mem,
        // autosave: true,
        // autosaveInterval: 5000,
        // autoload: true,
        // autoloadCallback: () => {
        //   this.collection = this.db.getCollection(name);
        //   if (this.collection == null) {
        //     this.collection = this.db.addCollection(name, config);
        //   }
        // },
      });
      this.collection = this.db.getCollection(name);
      if (this.collection == null) {
        this.collection = this.db.addCollection(name, config);
      }
    } catch (e) {
      console.error(e);
    }
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