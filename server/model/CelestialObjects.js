let mongoose = require('mongoose');

let CelestialObjectSchema = mongoose.Schema({
    Name: String,
    Description: String,
},{
    collection: "CelestialObjects"
});

module.exports = mongoose.model("CelestialObject",CelestialObjectSchema);

