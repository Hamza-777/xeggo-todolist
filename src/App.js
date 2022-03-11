import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import Register from './Components/Register';
import Login from './Components/Login';
import Todo from './Components/Todo';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
