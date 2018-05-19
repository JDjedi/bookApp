import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Books from '../api/books';


class App extends React.Component {
	render() {
		return (
			<div id="container-main">
				<h1>Hello world!</h1>
				<p>This is the bookApp! More to come soon!</p>
				<div>
					{this.props.books.map((book) => {
						return (
							<li key={book._id}>{book.bookName} - {book.bookAuthor}</li>
						)
					})}
				</div>
			</div>
		)
	}
}

export default withTracker(() => {
	let showBooks = Meteor.subscribe('allBooks')

	return {
		ready: showBooks.ready(),
		books: Books.find({}).fetch()
	}
})(App);


