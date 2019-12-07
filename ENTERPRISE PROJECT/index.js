const express = require('express')
const mongodb = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./html_data'))

app.get('/menu',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");	
		dbo.collection('Starters').find({}).toArray(function(err, result) 
		{
			if (err) throw err;
			// write HTML output
          var output = '<html><header><title>Display DB</title></header><body>';
          output += '<table border="1"><tr><td><b>' + 'ID' + '</b></td><td><b>' + 'NAME' + '</b></td><td><b>' + 'PRICE' + '</b></td><td><b>' + 'DESCRIPTION' + '</b></td></tr>';

          // process todo list
            result.forEach(function(results){
            output += '<tr><td>' + results._id + '</td><td>' + results.Name +  '</td><td>' + results.Price  +'</td><td>' + results.Desc +'</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
		  res.send(output);
		  console.log(result);
			//res.send(JSON.stringify(result,null,2));
			db.close();
		});
	});
});

//CODE TO READ DATA FROM COLLECTION
app.post('/menu_data_in',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var doc = { '_id':req.body.menu_id,
        'Name':req.body.menu_name,
        'Price':req.body.menu_price,
        'Desc':req.body.menu_desc};
		dbo.collection('Starters').insertOne(doc,function(err, result) 
		{
			if (err) throw err
			res.send("Data is inserted to menu");
			db.close();
		});
	});
});

//CODE TO READ DATA FROM COLLECTION WITH PARAMETERS
app.get('/menu_p/:Name',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("FoodHubDb");
dbo.collection('Starters').find({"Name":(req.body.menu_name)}).toArray(function(err, result)
{
if (err) throw err;
res.send(result);
db.close();
});
});
});

app.get('/book',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");	
		dbo.collection('Bookings').find({}).toArray(function(err, result) 
		{
			if (err) throw err;
			// write HTML output
          var output = '<html><header><title>Display DB</title></header><body>';
          output += '<table border="1"><tr><td><b>' + 'Booking ID' + '</b></td><td><b>' + 'Customer ID' + '</b></td><td><b>' + 'No of members' + '</b></td><td><b>' + 'Booking Date' + '</b></td><td><b>' + 'Event type' + '</b></td><td><b>' + 'Special Request' + '</b></td></tr>';

          // process todo list
            result.forEach(function(results){
            output += '<tr><td>' + results.booking_id + '</td><td>' + results.cust_id +  '</td><td>' + results.no_of_members  +'</td><td>' + results.bookingDate +'</td><td>' + results.event_Type +'</td><td>' + results.special_requ +'</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
		  res.send(output);
		  console.log(result);
			//res.send(JSON.stringify(result,null,2));
			db.close();
		});
	});
});



  
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ${port}..'));
