import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Optional Task Details Route */}
          {/* <Route path="/tasks/:id" element={<TaskDetails />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
