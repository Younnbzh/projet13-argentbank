import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
/**
* Composant ProtectedRoute
* Verifie si l'utilisateur est connecté pour accéder à la route protégée
*/
function ProtectedRoute({ children }) {
    // Verifie si connecté depuis le store Redux
    const { isAuthenticated } = useSelector((state) => state.auth);
    //  si non connecté -> login sans back possible avec replace
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    // sinon affiche la route
    return children;
}
export default ProtectedRoute;