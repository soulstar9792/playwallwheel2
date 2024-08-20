import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Main from './pages/Main';
import Spin from './pages/Spin';
import Inventory from './pages/Inventory';
import 'toastr/build/toastr.min.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/spin/:type" element={<Spin />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;