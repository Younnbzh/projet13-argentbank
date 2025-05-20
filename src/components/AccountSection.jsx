import '../assets/css/components/AccountSection.css';
/**
 * Composant AccountSection
 * Ligne de compte bancaire avec le détail et le bouton "View transactions"
 */
function AccountSection({ title, amount, description }) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    );
}
export default AccountSection;