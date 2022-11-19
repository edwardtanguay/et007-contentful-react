import { useState, useEffect } from 'react';
import axios from 'axios';

interface IBook {
	sys: {
		id: string;
	};
	title: string;
	description: string;
	bookImage: {
		url: string;
	};
}

const space = import.meta.env.VITE_SPACE_ID;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const url = `https://graphql.contentful.com/content/v1/spaces/${space}?access_token=${accessToken}`;
const query = `
		{
			bookCollection {
				items {
					sys {
						id
					}
					title
					description
					bookImage {
						url
					}
				}
			}
		}	
	`;

export const PageBooksWithGraphql = () => {
	const [books, setBooks] = useState<IBook[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios({
				url,
				method: 'post',
				data: {
					query,
				},
			});
			const _books = response.data.data.bookCollection.items;

			setBooks(_books);
		})();
	}, []);

	return (
		<div className="page pageBooksWithGraphql">
			<p>There are {books.length} books:</p>
			<div className="books">
				{books.map((book) => {
					return (
						<div className="book" key={book.sys.id}>
							<img src={book.bookImage.url} />
							<div className="info">
								<div className="title">{book.title}</div>
								<div className="description">
									{book.description}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
