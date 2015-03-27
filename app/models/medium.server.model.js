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
		trim: true
	},
	takenAt:{
		type: Date,
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
  imageLowResUrl: {
		type: String,
		default: '',
		trim: true
  },
  imageThumbnail: {
  	type: String,
  	default: '',
		trim: true
  },
  imageStandardUrl: {
  	type: String,
  	default: '',
		trim: true
  },
  videoStandardUrl: {
  	type: String,
  	default: '',
		trim: true
  },
  videoLowUrl: {
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
