'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const stompClient = require('./websocket-listener');

const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {books: [], attributes: [], page: 1, pageSize: 2, links: {}
		   , loggedInUser: this.props.loggedInUser};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
	}

	loadFromServer(pageSize) {
		follow(client, root, [
				{rel: 'books', params: {size: pageSize}}]
		).then(bookCollection => {
			return client({
				method: 'GET',
				path: bookCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				// tag::json-schema-filter[]
				/**
				 * Filter unneeded JSON Schema properties, like uri references and
				 * subtypes ($ref).
				 */
				Object.keys(schema.entity.properties).forEach(function (property) {
					if (schema.entity.properties[property].hasOwnProperty('format') &&
						schema.entity.properties[property].format === 'uri') {
						delete schema.entity.properties[property];
					}
					else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
						delete schema.entity.properties[property];
					}
				});

				this.schema = schema.entity;
				this.links = bookCollection.entity._links;
				return bookCollection;
				// end::json-schema-filter[]
			});
		}).then(bookCollection => {
			this.page = bookCollection.entity.page;
			return bookCollection.entity._embedded.books.map(book =>
					client({
						method: 'GET',
						path: book._links.self.href
					})
			);
		}).then(bookPromises => {
			return when.all(bookPromises);
		}).done(book => {
			this.setState({
				page: this.page,
				employees: books,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links
			});
		});
	}

	onCreate(newBook) {
		follow(client, root, ['books']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newBook,
				headers: {'Content-Type': 'application/json'}
			})
		})
	}

	onUpdate(book, updatedBook) {
		if(book.entity.user.name === this.state.loggedInUser) {
			updatedBook["user"] = book.entity.user;
			client({
				method: 'PUT',
				path: book.entity._links.self.href,
				entity: updatedBook,
				headers: {
					'Content-Type': 'application/json',
					'If-Match': book.headers.Etag
				}
			}).done(response => {
				/* Let the websocket handler update the state */
			}, response => {
				if (response.status.code === 403) {
					alert('ACCESS DENIED: You are not authorized to update ' +
						book.entity._links.self.href);
				}
				if (response.status.code === 412) {
					alert('DENIED: Unable to update ' + book.entity._links.self.href +
						'. Your copy is stale.');
				}
			});
		} else {
			alert("You are not authorized to update");
		}
	}

	onDelete(book) {
		client({method: 'DELETE', path: book.entity._links.self.href}
		).done(response => {/* let the websocket handle updating the UI */},
		response => {
			if (response.status.code === 403) {
				alert('ACCESS DENIED: You are not authorized to delete ' +
					book.entity._links.self.href);
			}
		});
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(bookCollection => {
			this.links = bookCollection.entity._links;
			this.page = bookCollection.entity.page;

			return bookCollection.entity._embedded.books.map(book =>
					client({
						method: 'GET',
						path: book._links.self.href
					})
			);
		}).then(bookPromises => {
			return when.all(bookPromises);
		}).done(books => {
			this.setState({
				page: this.page,
				books: books,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'books',
			params: {size: this.state.pageSize}
		}]).done(response => {
			if (response.entity._links.last !== undefined) {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		})
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'books',
			params: {
				size: this.state.pageSize,
				page: this.state.page.number
			}
		}]).then(bookCollection => {
			this.links = bookCollection.entity._links;
			this.page = bookCollection.entity.page;

			return bookCollection.entity._embedded.books.map(book => {
				return client({
					method: 'GET',
					path: book._links.self.href
				})
			});
		}).then(bookPromises => {
			return when.all(bookPromises);
		}).then(books => {
			this.setState({
				page: this.page,
				books: books,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		stompClient.register([
			{route: '/topic/newBook', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updateBook', callback: this.refreshCurrentPage},
			{route: '/topic/deleteBook', callback: this.refreshCurrentPage}
		]);
	}

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<BookList page={this.state.page}
							  employees={this.state.books}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  attributes={this.state.attributes}
							  onNavigate={this.onNavigate}
							  onUpdate={this.onUpdate}
							  onDelete={this.onDelete}
							  updatePageSize={this.updatePageSize}
							  loggedInUser={this.state.loggedInUser}/>
			</div>
		)
	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newBook = {};
		this.props.attributes.forEach(attribute => {
			newBook[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newBook);
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
		});
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);
		return (
			<div>
				<a href="#createBook">Create</a>

				<div id="createBook" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new book</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const updatedBook = {};
		this.props.attributes.forEach(attribute => {
			updatedBook[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.book, updatedBook);
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={this.props.book.entity[attribute]}>
				<input type="text" placeholder={attribute}
					   defaultValue={this.props.book.entity[attribute]}
					   ref={attribute} className="field"/>
			</p>
		);

		const dialogId = "updateBook-" + this.props.book.entity._links.self.href;

		const isUserCorrect = this.props.book.entity.user.name == this.props.loggedInUser;

		if (isUserCorrect === false) {
			return (
					<div>
						<a>Not Your User</a>
					</div>
				)
		} else {
			return (
				<div>
					<a href={"#" + dialogId}>Update</a>
	
					<div id={dialogId} className="modalDialog">
						<div>
							<a href="#" title="Close" className="close">X</a>
	
							<h2>Update an user</h2>
	
							<form>
								{inputs}
								<button onClick={this.handleSubmit}>Update</button>
							</form>
						</div>
					</div>
				</div>
			)
		}
	}

}

class BookList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		const pageInfo = this.props.page.hasOwnProperty("number") ?
			<h3>Books - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;

		const books = this.props.books.map(book =>
			<Book key={book.entity._links.self.href}
					  book={book}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onDelete={this.props.onDelete}
					  loggedInManager={this.props.loggedInManager}/>
		);

		const navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}

		return (
			<div>
				{pageInfo}
				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
				<table>
					<tbody>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Image</th>
							<th>User</th>
							<th></th>
							<th></th>
						</tr>
						{books}
					</tbody>
				</table>
				<div>
					{navLinks}
				</div>
			</div>
		)
	}
}

class Book extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.book);
	}

	render() {
		return (
			<tr>
				<td>{this.props.book.entity.title}</td>
				<td>{this.props.book.entity.author}</td>
				<td>{this.props.book.entity.image}</td>
				{/*<td>{this.props.book.entity.download_count}</td>*/}
				<td>{this.props.book.entity.user.name}</td>
				<td>
					<UpdateDialog book={this.props.book}
								  attributes={this.props.attributes}
								  onUpdate={this.props.onUpdate}
								  loggedInManager={this.props.loggedInManager}/>
				</td>
				<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App loggedInUser={document.getElementById('username').innerHTML } />,
	document.getElementById('react')
)
