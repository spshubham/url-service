
//require mongoose module
var mongoose = require("mongoose");

const mongoConf = require(process.env.CONFIG_DIR +"/mongoConf").conf;

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};


//export this function and imported by server.js
module.exports.dbConnect = async function(reconnect = 1) {
  try{
    await mongoose.connect(mongoConf.dbURL);
    //mongoose.set('useFindAndModify', false);

    mongoose.connection.on("connected", function() {
      console.log("Mongoose default connection is open to " + mongoConf.dbURL);
    });

    mongoose.connection.on("error", function(err) {
      console.log("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on("disconnected", function() {
      console.log("Mongoose default connection is disconnected");
    });

    process.on("SIGINT", function() {
      mongoose.connection.close(function() {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
      });
    });
  } catch(err){
    console.log("Error occured in connecting to the database. error = ", err);
    if(reconnect < 5){
      console.log("Now reconnecting again after 5 seconds");
      await wait(5000);
      this.dbConnect(reconnect + 1);
    }
    else{
      console.log("Connection to the database is not possible so now exiting with exit code as 1");
      process.exit(1);
    }

  }


};
