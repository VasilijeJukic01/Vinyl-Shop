const express = require('express');
const Joi = require('joi');
const path = require('path');
const bp = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

// Serve Vue.js app
app.use('/', express.static(path.join(__dirname, 'dist')));

// Serve admin interface
app.use('/admin', express.static(path.join(__dirname, 'static')));

app.use('/new-song', bp.urlencoded({extended: false}));

app.post('/new-song', (req, res) => {
	const schema = Joi.object().keys({
        name: Joi.string().trim().min(5).max(25).required(),
        performer: Joi.string().trim().min(5).max(30).required(),
        description: Joi.string().trim().min(1).required(),
        category: Joi.string().trim().min(1).required(),
        price: Joi.number().greater(0).required()
	});

	const {error} = schema.validate(req.body);
	
    if(error){
		return res.status(400).json({ error: error.details[0].message });
    }
	req.body.description.replace(/\r?\n|\r/g, '<br>');
})

app.listen(9000, () => {
	console.log('Server is running on port 9000');
});
