import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Team Dragonfly. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
