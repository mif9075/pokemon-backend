const mongoose = require('mongoose');
let teamschema = new mongoose.Schema({
    name: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    pokemons: [{
        id: { type: String, default: '' },
        name: { type: String, default: ''},
        image: { type: String, default: ''}
    }]
})

module.exports = mongoose.model('team', teamschema);