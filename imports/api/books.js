import { Mongo } from 'meteor/mongo';

const Books = new Mongo.Collection('books');

if (Meteor.isServer) {
	Meteor.publish('allBooks', function() {
		return Books.find({});
	});

	Meteor.methods({
		insertNewBook(bookName, bookAuthor, bookHasBeenRead) {
			check(bookName, String);
			check(bookAuthor, String);
			check(bookHasBeenRead, String);

			Books.insert({
				book: {
					bookName: bookName,
					bookAuthor: bookAuthor,
					bookHasBeenRead: bookHasBeenRead
				}
			})
		}
	});
}

export default Books;

