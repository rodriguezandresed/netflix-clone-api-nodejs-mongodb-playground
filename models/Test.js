const mongoose = require("mongoose");


// ONE TO MANY ONE DIRECTOR WITH MANY MOVIES

const PeliSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    desc:{type:String},
    img:{type:String},
    imgTitle:{type:String},
    imgSm:{type:String},
    trailer:{type:String},
    video:{type:String},
    year:{type:String},
    limit:{type:Number},
    genre:{type:String},
    isSeries:{type:Boolean, default:false},
},
{timestamps:true}
);

const DirectorSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    age:{type:Number},
    movies:[PeliSchema],

    // MANY TO MANY
    pelis:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "PeliModel" 
    }

},
{timestamps:true}
);

module.exports = mongoose.model("Director", DirectorSchema)
module.exports = mongoose.model("Peli", PeliSchema)

