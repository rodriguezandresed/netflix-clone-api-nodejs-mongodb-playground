const router = require ("express").Router();
const Movie = require("../models/Movie");
const verify = require('../verifyToken')

//CREATE (first does the verify function then comes back)
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newMovie = new Movie(req.body);
      try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to Post Movies!");
    }
  });




//Update (first does the verify function then comes back)
router.put("/:id", verify, async (req,res) =>{
    if (req.user.isAdmin)
    {
       const newUpdatedMovie = new Movie.findByIdAndUpdate(req.params.id,
        {
        $set:req.body,
       },
       {new:true}
       );
       try{
        const savedMovie = await newMovie.save();
        res.status(200).json(savedMovie);
       }catch(err){
        res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed to see this Data!")
    }
})

//DELETE (first does the verify function then comes back)
router.delete("/:id", verify, async (req,res) =>{
    if (req.user.isAdmin)
    {
    try{
       await Movie.findByIdAndDelete(req.params.id);
       res.status(200).json("Movie has been deleted!");
       }catch(err){
        res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed to see this Data!")
    }
})


//GET (first does the verify function then comes back)
router.get("/find/:id", verify, async (req,res) =>{

    try{
       const movie = await Movie.findById(req.params.id);
       res.status(200).json(movie);
       }catch(err){
        res.status(500).json(err);
       }

})


//GET RANDOM (first does the verify function then comes back)
//type ?type=series -> random series
router.get("/random", verify, async (req,res) =>{
    const type = req.query.type;
    let movie;
    try{
        if (type === "series"){
            movie = await Movie.aggregate([
                {$match: {isSeries:true} },
                {$sample: {size: 1}},
            ])
        } else{
            movie = await Movie.aggregate([
                {$match: {isSeries:false} },
                {$sample: {size: 1}},
            ])
        }
        res.status(200).json(movie);
       }catch(err){
        res.status(500).json(err);
       }

})

//GET ALL (first does the verify function then comes back)
router.get("/", verify, async (req,res) =>{
    if (req.user.isAdmin)
    {
    try{
      const movies =  await Movie.find();
       res.status(200).json(movies.reverse());
       }catch(err){
        res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed to see this Data!")
    }
})



module.exports = router