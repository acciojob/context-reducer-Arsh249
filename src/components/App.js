import React, { useState, useContext, createContext } from "react";

// Create a Context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const login = () => {
    setIsAuthenticated(true);
    setCurrentUser("rohan");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const ShoppingList = () => {
  const { isAuthenticated, currentUser, login, logout } =
    useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputValue) {
      setItems([...items, inputValue]);
      setInputValue(""); // Clear the input
    }
  };

  const removeItem = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  const clearList = () => {
    setItems([]);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <div id="current-user">
            Current user: {currentUser}, isAuthenticated: Yes
          </div>
          <button id="signout" onClick={logout}>
            Signout
          </button>
        </>
      ) : (
        <button id="login-btn" onClick={login}>
          Login
        </button>
      )}
      <br />
      {isAuthenticated && (
        <>
          <input
            id="shopping-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addItem}>Add</button>
          <button id="clear-list" onClick={clearList}>
            Clear
          </button>
          <ul>
            {items.map((item) => (
              <li key={item} id={`item-${item}`}>
                {item}
                <button id={`remove-${item}`} onClick={() => removeItem(item)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ShoppingList />
    </AuthProvider>
  );
};

export default App;
