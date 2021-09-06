const Loki = require('lokijs');
const AWSS3SyncAdapter = require('lokijs/src/aws-s3-sync-adapter.js');
const AWS = require('aws-sdk');

// load environment variables
require('dotenv').config();

const config = {
  options: {
    AWS,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    bucket: 'habl-listory-01',
  },
  collections: ['list', 'list-item'],
  collectionOptions: {
    unique: ['name', 'slug'],
    autoupdate: true,
  },
};

class Database {
  constructor() {
    this._adapter = null;
    this._collections = null;
    this._database = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      try {
        if (this._database != null) {
          resolve(this._database);
        }
        const db = new Loki('db/listory.json', {
          adapter: this.adapter,
          autoload: true,
          autoloadCallback: () => {
            config.collections.forEach((c) => {
              this.collections[c] = db.getCollection(c) || db.addCollection(c, config.collectionOptions);
            });
            this._database = db;
            resolve(db);
          },
        });
      } catch (e) {
        // TODO this is going to catastrophically fail
        reject(e);
      }
    });
  }

  get adapter() {
    if (this._adapter == null) {
      this._adapter = new AWSS3SyncAdapter(config.options);
    }
    return this._adapter;
  }

  get collections() {
    if (this._collections == null) {
      this._collections = config.collections.reduce((a, c) => {
        return {
          ...a,
          [c]: null,
        };
      }, {});
    }
    return this._collections;
  }

  get database() {
    return this._database;
  }
}

module.exports = Database;