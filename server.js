'use strict';
const express = require("express");
const PORT = 3040;
const app = express();


app.get('/', (req, res) => {        
  res.send("Welcome to Joshua Kelcey's docker server for adding numbers!");
}); 

app.listen(PORT, ()=> {
      console.log(`Running on Port:${PORT}`);
  })
  
const add = function(n1,n2){
    return n1+n2;
  }
  
const calculator = function(req,operation){
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    checkNumbers(n1,n2);
    const result = operation(n1,n2);
    return result;
}

const checkNumbers = function(n1,n2){

  if(isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
  }
  
  if(isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
  }
  
  if (n1 === NaN || n2 === NaN) {
      throw new Error("Parsing Error");
  }
}

app.get("/add", (req,res)=>{
  try{
      const result = calculator(req, add);
      res.status(200).json({statuscode:200, data: result }); 
  } catch(error) { 
      res.status(500).json({statuscode:500, msg: error.toString() })
    }
});
