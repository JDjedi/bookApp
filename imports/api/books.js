import { Mongo } from 'meteor/mongo';

const Books = new Mongo.Collection('books');

if (Meteor.isServer) {
	Meteor.publish('allBooks', function() {
		return Books.find({});
	})
}

export default Books;

