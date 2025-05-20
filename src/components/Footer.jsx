import '../assets/css/components/Footer.css';
/**
* Composant Footer
* pied de page du site
*/
function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">Copyright {new Date().getFullYear()} Argent Bank</p>
        </footer>
    );
}
export default Footer;