// src/App.js
import React, { useState, useContext, createContext } from 'react';
import './styles/App.css';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to provide authentication state and actions
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    currentUser: '',
    isAuthenticated: false,
  });

  // Function to handle login
  const login = () => {
    setAuth({
      currentUser: 'rohan',
      isAuthenticated: true,
    });
  };

  // Function to handle signout
  const signout = () => {
    setAuth({
      currentUser: '',
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/App.js (continued)
function AuthSection() {
  const { auth, login, signout } = useContext(AuthContext);

  return (
    <div className="auth-section">
      <button id="login-btn" onClick={login}>
        Login
      </button>
      <button id="signout" onClick={signout}>
        Signout
      </button>
      <p id="current-user">
        Current user: {auth.currentUser ? auth.currentUser : ''}, isAuthenticated:{' '}
        {auth.isAuthenticated ? 'Yes' : 'No'}
      </p>
    </div>
  );
}

// src/App.js (continued)
function ShoppingList() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Add item to the list
  const handleAdd = () => {
    const trimmedInput = input.trim();
    if (trimmedInput === '') return;
    setList([...list, trimmedInput]);
    setInput('');
  };

  // Remove a specific item from the list
  const handleRemove = (itemToRemove) => {
    setList(list.filter((item) => item !== itemToRemove));
  };

  // Clear the entire list
  const handleClear = () => {
    setList([]);
  };

  return (
    <div className="shopping-section">
      <input
        id="shopping-input"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter item"
      />
      <button onClick={handleAdd}>Add</button>
      <button id="clear-list" onClick={handleClear}>
        Clear
      </button>
      <ul>
        {list.map((item, index) => (
          <li key={index} id={`item-${item}`}>
            {item}
            <button id={`remove-${item}`} onClick={() => handleRemove(item)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <div className="app">
        <AuthSection />
        <ShoppingList />
      </div>
    </AuthProvider>
  );
}

export default App;
