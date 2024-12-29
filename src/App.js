import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<PrivateRoute />}>
        <Route path="/tasks" element={<TaskList />} />
      </Route>
    </Routes>
  );
}

export default App;