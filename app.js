var express = require('express');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.set('port', (process.env.PORT || 3000));


var database;
MongoClient.connect("mongodb://52.40.118.116:27017,52.33.167.196:27017,52.40.35.72:27017/CMPE?w=0&readPreference=secondary",
		{
			server: {
		      socketOptions: {
		        connectTimeoutMS: 500
		      }
		    },
			replSet: {
				reconnectWait :1000,
				rs_name:'rs1',
			}
		},
 function(err, db) {
	if(err)
	{
		console.log("could not connect to the database");
		throw err;
	}
	database = db;
	app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
	});
 });
  

// ++ Selection related changes
  app.get("/getRecords", function(req, res) {
	  
  database.collection("products").find({"item":"card"}).toArray(function(err, docs) {
    
  
	return res.send(JSON.stringify(docs));
  });
  });
  // -- Selection related changes
  
  // ++ Post start
  app.get("/postRecords", function(req, res) {
	  
	 	var collection =  database.collection("products");
		
		var doc1 = {"hello":"doc2"};
		  
		  collection.insert(doc1 , function (err, result) {
		      if (err) {
		          console.log(err);
		        } else {
		          console.log('Inserted documents into the "users" collection.');
		        }
		        //Close connection
		        //db.close();
		      });
	  
		return res.send(JSON.stringify(doc1));
	  }
  
	  );
// -- Post


