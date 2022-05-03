const mongoose = require('mongoose');

// TODO : Connect to mongooseDB
mongoose.connect("mongodb://127.0.0.1:27017/quiz_app",{useUnifiedTopology:true});

// check if connection is successful
const db = mongoose.connection;
db.on('error',console.error.bind(console,"connection is error"));
db.once("open",function(){
    console.log("connection is successfully");
})
// TODO : Define the Schema for the task

const informusers = new mongoose.Schema({
    user_name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:
    {
        type: String,
        require: true
    }

});

const QuestionSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    answer:{
        answer1:{
            type:String,
            require:true
        },
        answer2:{
            type:String,
            require:true
        },
        answer3:{
            type:String,
            require:true
        },
        answer4:{
            type:String,
            require:true
        }
    },
    correct_ans:{
        type:String,
        require:true
    },
    score: {
        type: Number,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"informusers"
    }

});
    


const listofQuestions = mongoose.model("questions",QuestionSchema);
const userPlay = mongoose.model("users",informusers);

module.exports = {listofQuestions,userPlay};
