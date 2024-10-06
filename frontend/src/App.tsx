// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {SpendingProvider} from './context/SpendingContext'; // Adjust the path as necessary
import DataFetchingAndDisplay from './pages/DataFetchingAndDisplay';
// import DataFiltringAndDisplay from './pages/DataFiltringAndDisplay'; // Adjust the path as necessary


const App = () => {
  return (
    <SpendingProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<DataFetchingAndDisplay />} />
            {/* <Route path="/filter" element={<DataFiltringAndDisplay />} /> */}
          </Routes>
        </div>
      </Router>
    </SpendingProvider>
  );
};

export default App;
