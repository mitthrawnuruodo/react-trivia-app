// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className={styles.navbar}>
        {/* Left: Logo */}
        <div className={styles.logo}>
          <Link to="/">My React SPA</Link>
        </div>

        {/* Middle: Nav Links */}
        <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/trivia" onClick={() => setIsOpen(false)}>Trivia</Link>
          </li>
          <li>
            <Link to="/deploy" onClick={() => setIsOpen(false)}>Deploy</Link>
          </li>
        </ul>

        {/* Right: Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.menuToggle}
          aria-label="Toggle Menu"
        >
          {/* Inline SVG for the hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.hamburgerIcon}
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
