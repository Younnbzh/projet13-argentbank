import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUserProfile, updateUserName } from '../features/auth/authSlice';
import AccountSection from '../components/AccountSection';
import '../assets/css/pages/UserPage.css';
/**
 * Composant UserPage
 * Accueil utilisateur connecté 
  */
function UserPage() {
    // Hook dispatch redux 
    const dispatch = useDispatch();
    // Verifie si connecté, etat du loading et recupère les infos utilisateur depuis le store Redux
    const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
    // State locaux pour gérer l'édition et les valeurs des champs
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // Initialisation des champs avec les valeurs de l'utilisateur
    useEffect(() => {
        // Si user est auth mais que ses données ne sont pas chargées on les récupère
        if (isAuthenticated && !user) {
            dispatch(fetchUserProfile());
        }
        // si données dispo on les initialise les champs du form
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [dispatch, isAuthenticated, user]);
    // Bascule entre affichage et "edit name"
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };
    // Annulation de l'édit name
    const handleCancel = () => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
        setIsEditing(false);
    };
    // envoi des données de modif de l'edit name
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateUserName({ firstName, lastName }));
        setIsEditing(false);
    };
    // Redirection vers login si user n'est pas connecté
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    // Affichage message loading pendant chargement données api
    if (isLoading || !user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                {/* Affichage */}
                {!isEditing ? (
                    <>
                        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                        <button className="edit-button" onClick={handleEditToggle}>Edit Name</button>
                    </>
                ) : (
                    // Edition "edit name"
                    <form onSubmit={handleSubmit} className="edit-form">
                        <h1>Welcome back</h1>
                        <div className="edit-inputs">
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
                        </div>
                        <div className="edit-buttons">
                            <button type="submit" className="save-button">Save</button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {/* Liste des comptes bancaires de l'utilisateur avec données fictives */}
            <AccountSection
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <AccountSection
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <AccountSection
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main>
    );
}

export default UserPage;