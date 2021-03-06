import { Mongo } from "meteor/mongo";

const Books = new Mongo.Collection("books");

if (Meteor.isServer) {
	Meteor.publish("allBooks", function() {
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
			});
		},

		changeReadStatus(bookObj, bookHasBeenRead) {
			check(bookObj, Object);
			check(bookHasBeenRead, String);

			if (bookHasBeenRead === "true") {
				Books.update(bookObj._id, {
					$set: { "book.bookHasBeenRead": "false" }
				});
			} else {
				Books.update(bookObj._id, {
					$set: { "book.bookHasBeenRead": "true" }
				});
			}
		},

		deleteBook(bookObj) {
			Books.remove(bookObj._id);
		}
	});
}

export default Books;
