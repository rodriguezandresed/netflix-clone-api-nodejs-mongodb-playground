//Enables the mounting of the server locally
const express = require("express");
//Enables the use of mongoDB 
const mongoose = require("mongoose");
//Enables the .env to hide secrets
const dotenv = require("dotenv");
//authRoute for setting authentication routes
const authRoute = require("./routes/auth")
//General Use Routes
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")



//dotenv start up in order to be able to use it
dotenv.config();

const app = express();

// Function Taken from MongoDB documentation to start the server
 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// This uses the express middleware functions app.use
//so that express allows json files
app.use(express.json());
//enables the route, where "<route>", authRoute (Defines Endpoints)
//then it's subroutes /api/auth/login or /api/auth/register and so on
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

//Express command to start the server

app.listen(8800, ()=>{
    console.log("Backend is running!")
})