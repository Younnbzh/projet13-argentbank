import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserProfile } from './features/auth/authSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './components/ProtectedRoute';
/**
 * Composant App
 * Composant principal de l'application qui gère le routage et la structure globale
 */
function App() {
  // Hook dispatch redux
  const dispatch = useDispatch();
  // Verifie si connecté et recupère les infos utilisateur depuis le store Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // si user connecté mais que données pas encore chargées, on les récupère
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          {/* Page de profil protégée par composant ProtectedRoute */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;