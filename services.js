const express = require('express')
const mongodb = require('mongodb');
const app = express();
app.use(express.json());

//CODE TO CONNECT TO MONGODB DATABASE AND LIST DOWN ALL COLLECTIONS FROM IT
app.get('/api/FoodHubDb',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		dbo.listCollections().toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
	
});

//CODE TO READ DATA FROM COLLECTION
app.get('/api/FoodHubDb/collection',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		dbo.collection('Bookings').find({}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

//CODE TO READ DATA FROM COLLECTION WITH PARAMETERS
app.get('/api/FoodHubDb/collection/:booking_id',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		dbo.collection('Starters').find({"booking_Id":(req.params.Booking_id)}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});


//CODE TO INSERT DOCUMENTS INTO COLLECTIONS
app.post('/api/FoodHubDb/collection/insert',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var doc = { '_id':'sm13',
        'Name':'Fish tikka',
        'Price':'8.99',
        'Desc':'Fish fried and spiced and made crispy and yummy',};
		dbo.collection('Starters').insertOne(doc,function(err, result) 
		{
			if (err) throw err;
			res.send("DATA INSERTED");
			db.close();
		});
	});
});

//CODE TO UPDATE DATA INTO COLLECTIONS
app.put('/api/FoodHubDb/collection/update',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var query = { Name: "Fish tikka" };
		var newquery = { $set: {Price:'7.99' } };
		dbo.collection('Starters').updateOne(query,newquery,function(err, result) 
		{
			if (err) throw err;
			res.send('COLLECTION CUSTOMER UPDATED');
			db.close();
		});
	});
	
});
   
//CODE TO DELETE DOCUMENT IN COLLECTION
app.delete('/api/FoodHubDb/collection/delete',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var query = { Name: "Fish tikka" };
		dbo.collection('Starters').deleteOne(query,function(err, result) 
		{
			if (err) throw err;
			res.send('ONE DOCUMENT DELETED');
			db.close();
		});
	});
	
});
 

  
const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening on port ${port}..'));








