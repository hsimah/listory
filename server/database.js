const Loki = require('lokijs');
const AWSS3SyncAdapter = require('lokijs/src/aws-s3-sync-adapter.js');
const AWS = require('aws-sdk');

function DatabaseFactory({ collections }) {
  const options = {
    AWS,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    bucket: 'habl-listory-01',
  };
  const adapter = new AWSS3SyncAdapter(options);
  const db = new Loki('db/listory.json', {
    adapter,
    autoload: true,
    autoloadCallback: () => {
      collections.forEach((c) => {
        if (db.getCollection(c) == null) {
          db.addCollection(c, {
            unique: ['name', 'slug'],
            autoupdate: true,
          });
        }
      });
    },
  });
  return db;
}

module.exports = DatabaseFactory;