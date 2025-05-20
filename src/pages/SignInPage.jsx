import SignInForm from '../components/SignInForm';
import '../assets/css/pages/SignInPage.css';
/**
 * Composant SignInPage
 * Page de connexion avec formulaire 
 */
function SignInPage() {
  return (
    <main className="main bg-dark">
      <SignInForm />
    </main>
  );
}

export default SignInPage;