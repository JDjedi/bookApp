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

			var bookHasBeenRead = bookHasBeenRead.toLowerCase();

			Books.insert({
				book: {
					bookName: bookName,
					bookAuthor: bookAuthor,
					bookHasBeenRead: bookHasBeenRead
				}
			})
		},

		changeReadStatus(bookObj, bookHasBeenRead) {
			check(bookObj, Object);
			check(bookHasBeenRead, String);

			if (bookHasBeenRead === 'true') {
				console.log(bookObj.book.bookHasBeenRead);
				Books.update(bookObj._id, {
					$set: { 'book.bookHasBeenRead' : "false" }
				});
			} else {
				console.log(bookObj.book.bookHasBeenRead);
				Books.update(bookObj._id, {
					$set: { 'book.bookHasBeenRead' : "true" }
				});
			}
		}
	});
}

export default Books;

