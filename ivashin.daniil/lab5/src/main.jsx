import React, {createContext, StrictMode, useContext, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const ThemeContext = createContext(null);

const books = [
  {
    id: 1,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    price: '890 ₽',
    description:
      'Роман о любви, свободе и выборе, который не теряет актуальности.',
  },
  {
    id: 2,
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    year: 1936,
    price: '760 ₽',
    description: 'История дружбы и надежды на фоне непростого времени.',
  },
  {
    id: 3,
    title: 'Дюна',
    author: 'Фрэнк Герберт',
    year: 1965,
    price: '1 090 ₽',
    description: 'Эпическая фантастика о власти, ответственности и судьбе.',
  },
  {
    id: 4,
    title: '451° по Фаренгейту',
    author: 'Рэй Брэдбери',
    year: 1953,
    price: '640 ₽',
    description: 'Антиутопия о мире, в котором книги становятся запрещёнными.',
  },
];

function ThemeProvider({children}) {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Компонент должен находиться внутри ThemeProvider.');
  }

  return context;
}

function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      data-testid="theme-toggle"
      type="button"
      aria-pressed={isDarkTheme}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDarkTheme ? '☀' : '☾'}
      </span>
      {isDarkTheme ? 'Светлая тема' : 'Тёмная тема'}
    </button>
  );
}

function BookCard({book}) {
  return (
    <article className="book-card">
      <div className="book-cover" aria-hidden="true">
        <span>{book.title.slice(0, 1)}</span>
      </div>
      <div className="book-content">
        <p className="book-year">{book.year}</p>
        <h2>{book.title}</h2>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <div className="book-footer">
          <strong>{book.price}</strong>
          <button className="buy-button" type="button">
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}

function BookStore() {
  const {theme} = useTheme();
  const themeClass = theme === 'dark' ? 'app-dark' : 'app-light';

  return (
    <div className={['app', themeClass].join(' ')} data-theme={theme}>
      <header className="app-header">
        <div>
          <p className="eyebrow">ЛИТЕРАТУРА ДЛЯ ВДОХНОВЕНИЯ</p>
          <h1>Книжная полка</h1>
          <p className="header-description">
            Собрали истории, к которым хочется возвращаться.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <section
        className="book-list"
        data-testid="book-list"
        aria-label="Список книг"
      >
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </section>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BookStore />
    </ThemeProvider>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
