import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../features/auth/authSlice';
import '../assets/css/components/SignInForm.css';
/**
 * Composant SignInForm
 * Formulaire de connexion avec email et mot de passe.
 */
function SignInForm() {
    // States locaux du form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    // Hook dispatch redux et navigation
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Récupération de l'état de chargement et des erreurs depuis le store Redux
    const { isLoading, error } = useSelector((state) => state.auth);
    // Gère le submit du form de connexion, dispatche l'action et route vers le profil si succès
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        try {
            // Dispatch la connexion avec unwrap pour catch l'erreur
            await dispatch(loginUser({ email, password })).unwrap();
            navigate('/profile');
        } catch (err) {
        }
    };
    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            {/* Affichage des messages d'erreur */}
            {error ? (
                <div className="error-message">
                    {typeof error === 'string' ? error : 'An error occurred. Please try again.'}
                </div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                {/* Submit du form utilise isLoading du store Redux pour passer le bouton à disabled et passage à "Signing In..." pendant le submit */}
                <button type="submit" className="sign-in-button" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </section>
    );
}
export default SignInForm;