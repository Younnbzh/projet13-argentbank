import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import logo from '../assets/argentBankLogo.png';
import '../assets/css/components/Header.css';
/**
* Composant Header
* Affiche la barre de navigation principale avec :
* si non connecté : le logo, un bouton signin
* si connecté : le nom de l'utilisateur et signout.
*/
function Header() {
   // Hook dispatch redux et navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Verifie si connecté et recupère les infos utilisateur depuis le store Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Déconnexion : Dispatch l'action de déconnexion et redirige vers la page d'accueil
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.firstName || 'User'}
            </Link>
            <button className="main-nav-item logout-button" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Header;