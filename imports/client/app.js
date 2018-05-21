import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Books from '../api/books';
import Book from './book';


class App extends React.Component {

	addBooks(event) {
		event.preventDefault();
		const bookName = this.refs.bookName.value.trim();
		const bookAuthor = this.refs.bookAuthor.value.trim();
		const bookHasBeenRead = this.refs.bookHasBeenRead.value.trim();

		if (bookName != '' && bookAuthor != '' && bookHasBeenRead != '') {
			Meteor.call('insertNewBook', bookName, bookAuthor, bookHasBeenRead, (err, res) => {
				if (!err) {
					this.refs.bookName.value = '';
					this.refs.bookAuthor.value = '';
					this.refs.bookHasBeenRead.value = '';
				}
			});
		}
		//console.log(this);
	}

	render() {
		return (
			<div id="container-main">
				<h1>Hello world!</h1>
				<p>This is the bookApp! More to come soon!</p>
				<div>
					{this.props.books.map((bookMap) => {
						return (
							<li key={bookMap._id}>{bookMap.book.bookName} - {bookMap.book.bookAuthor}</li>
						)
					})}
					<br/>
				</div>
				<div id="container-new-book" onSubmit={this.addBooks.bind(this)}>
					<form className='new-books'>
						Book Name: <input type='text' ref='bookName'/>
						<br/>
						Book Author:<input type='text' ref='bookAuthor'/>
						<br/>
						Read?:<input type='text' ref='bookHasBeenRead'/>
						<br/>
						<button type='submit'>New Book</button>
					</form>
				</div>
			</div>
		)
	}
}

export default withTracker(() => {
	let showBooks = Meteor.subscribe('allBooks')

	return {
		books: Books.find({}).fetch()
	}
})(App);


