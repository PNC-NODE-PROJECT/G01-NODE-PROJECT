const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors()); // To allow any origin
app.use(express.json()); // To read json data in request body
// app.use(express.json());

app.listen(3000,()=>{
    console.log("app run on http://localhost:3000");
});

app.use(express.static("public"));

//  todo : Define dynamic routes 
const itemRoutes = require("./routes/items_routes");

app.use("/",itemRoutes);

const userplayQ = require("./routes/userAcc");

app.use("/log",userplayQ);




