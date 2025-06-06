import FeatureItem from './FeatureItem';
import iconChat from '../assets/icon-chat.png';
import iconMoney from '../assets/icon-money.png';
import iconSecurity from '../assets/icon-security.png';
import '../assets/css/components/Features.css';
/**
 * Composant Features
 * Affiche une section sur la home regroupant les arguments commerciaux principaux
 * sous forme de 3 cartes avec icône titre et descriptions.
 */
function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            <FeatureItem
                iconSrc={iconChat}
                title="You are our #1 priority"
                description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
            />
            <FeatureItem
                iconSrc={iconMoney}
                title="More savings means higher rates"
                description="The more you save with us, the higher your interest rate will be!"
            />
            <FeatureItem
                iconSrc={iconSecurity}
                title="Security you can trust"
                description="We use top of the line encryption to make sure your data and money is always safe."
            />
        </section>
    );
}
export default Features;