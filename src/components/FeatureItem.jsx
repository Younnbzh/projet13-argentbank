import '../assets/css/components/FeatureItem.css';
/**
 * Composant FeatureItem
 * Affiche un arguments clef d'argentbank de la home avec Icone / description / titre
 */
function FeatureItem({ iconSrc, title, description }) {
    return (
        <div className="feature-item">
            <img src={iconSrc} alt="Feature Icon" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}
export default FeatureItem;