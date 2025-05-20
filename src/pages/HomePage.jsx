import MainBanner from '../components/MainBanner';
import Features from '../components/Features';
import '../assets/css/pages/HomePage.css';
/**
* Composant HomePage
* Page d'accueil de l'application 
*/
function HomePage() {
  return (
    <main>
      <MainBanner />
      <Features />
    </main>
  );
}

export default HomePage;