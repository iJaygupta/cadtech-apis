const LookUpData = require('./lookUp.json');

export function insertLookUpData(db){
  db.collection('commons').deleteMany();
  db.collection('commons').insertMany([LookUpData]);
}