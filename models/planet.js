const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  inhabitable: { type: Boolean, required: true },
  diameter: Number,
  orbit: [{
      period: Number,
      velocity: Number,
      eccentricity: Number
  }]
}, {collection: 'planet'}
)

const Planet = mongoose.model('Planet', planetSchema)

module.exports = Planet;
