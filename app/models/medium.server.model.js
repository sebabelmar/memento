'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	uniqueValidator = require('mongoose-unique-validator');

/**
 * Memories Schema
 */
var Memorie = new Schema({
	title :{
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
		created: {
		type: Date,
		default: Date.now
	}
})

/**
 * Medium Schema
 */
var MediumSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	takenAt:{
		type: Date,
		default: Date.now
	},
	tags :{
		type: [],
	},
	mediaType: {
		type: String
	},
	location: {
	  latitude: {type: Number, default: '', trim: true},
	  longitude: {type: Number, default: '', trim: true},
	  id: {type: String, default: '', trim: true},
	  street_address: {type: String, default: '', trim: true},
	  name: {type: String, default: '', trim: true}
  },
  lowResUrl: {
		type: String,
		default: '',
		trim: true
  },
  thumbnail: {
  	type: String,
  	default: '',
		trim: true
  },
  standardUrl: {
  	type: String,
  	default: '',
		trim: true
  },
  instagramId: {
		type: String,
		default: '',
		unique: true,
		trim: true
  },
	memories: [Memorie],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

MediumSchema.plugin(uniqueValidator);
mongoose.model('Medium', MediumSchema);
