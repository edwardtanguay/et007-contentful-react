import './App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { PageWelcome } from './pages/PageWelcome';
import { PageBooksWithRest } from './pages/PageBooksWithRest';
import { PageBooksWithGraphql } from './pages/PageBooksWithGraphql';

function App() {
	return (
		<div className="App">
			<h1>Contentful Demo</h1>
			<nav>
				<NavLink to="/welcome">Welcome</NavLink>
				<NavLink to="/booksWithRest">Books with REST</NavLink>
				<NavLink to="/booksWithGraphql">Books with GraphQL</NavLink>
			</nav>

			<Routes>
				<Route path="/welcome" element={<PageWelcome />} />
				<Route path="/booksWithRest" element={<PageBooksWithRest />} />
				<Route path="/booksWithGraphql" element={<PageBooksWithGraphql />} />
				<Route path="/" element={<Navigate to="/welcome" replace />} />
			</Routes>
		</div>
	);
}

export default App;
