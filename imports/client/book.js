import React from 'react';
import Books from '../api/books';

export default class Book extends React.Component {

	updateReadStatus() {
		Meteor.call('changeReadStatus', this.props.bookMap, this.props.bookMap.book.bookHasBeenRead);
		console.log("Client side call worked!")
	}


	render() {
		return(
			<div id="book">
				<div className='update-read-status'>
					<li>
						{this.props.bookMap.book.bookName} - 
						{this.props.bookMap.book.bookAuthor} - 
						{this.props.bookMap.book.bookHasBeenRead}
						<button onClick={this.updateReadStatus.bind(this)}>
							Update
						</button>
					</li>
				</div>
			</div>
		)
	}
}