import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;