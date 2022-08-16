import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/compare' element={<Compare />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
