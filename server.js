const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Lists = require('./src/server/models/lists.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());


app.post('/api/lists', (req, res) => {
	let list = new Lists();
	list.name = req.body.name;

	list.save((err, listSave) => {
		if (err) res.status(500).send({message:`Error at save list: ${err}`})

		res.status(200).send({list: listSave})
	})
})

app.get('/api/lists', (req, res) => {
	Lists.find({}, (err, lists) => {
		if (err) res.status(500).send({message:`Error: ${err}`})
		if(!products) return res.status(404).send({message: 'No lists'})
		res.status(200).send({lists})

	})
})

mongoose.connect('mongodb://localhost:27017/lists',(err , res) => {
	if(err){
		return console.log(`Error: ${err}`);
	}
	
	console.log('Conexión a la base de datos establecida');

	app.listen(port , () =>{
	console.log(`Listening on port ${port}`);
	});
});



