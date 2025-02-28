// src/App.jsx
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trivia from './pages/Trivia';
import Deploy from './pages/Deploy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="trivia" element={<Trivia />} />
        <Route path="deploy" element={<Deploy />} />
      </Route>
    </Routes>
  );
}

export default App;
