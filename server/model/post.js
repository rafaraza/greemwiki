var mongoose = require('mongoose');
 
module.exports = mongoose.model('Post',{
    titulo: String,
    conteudo: String,
    datainclusao: String,
    categoria: String,
    user: String
});