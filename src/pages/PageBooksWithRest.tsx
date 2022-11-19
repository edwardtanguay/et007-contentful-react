import { useState, useEffect } from 'react';
import { client } from '../client';

interface IBook {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
}

export const PageBooksWithRest = () => {
	const [books, setBooks] = useState<IBook[]>([]);

	useEffect(() => {
		(async () => {
			const response = await client.getEntries({
				content_type: 'book',
			});
			const rawBooks = response.items;
			const _books: IBook[] = rawBooks.map((rawBook: any) => {
				return {
					id: rawBook.sys.id,
					title: rawBook.fields.title,
					description: rawBook.fields.description,
					imageUrl: rawBook.fields.bookImage.fields.file.url,
				};
			});

			setBooks(_books);
		})();
	}, []);

	return (
		<div className="page pageBooks">
			<p>There are {books.length} books:</p>
			<div className="books">
				{books.map((book) => {
					return (
						<div className="book" key={book.id}>
							<img src={book.imageUrl} />
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