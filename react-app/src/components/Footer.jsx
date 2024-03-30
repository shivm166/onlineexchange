import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faPinterest,
  faWhatsapp, // Import WhatsApp icon
  faGithub // Import GitHub icon
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
    <div className="bg">
    
      <div className="social-links">
      
                <a href="#" className="facebook" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="#" className="twitter" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="instagram" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="pinterest" aria-label="Pinterest"><FontAwesomeIcon icon={faPinterest} /></a>
                <a href="#" className="whatsapp" aria-label="WhatsApp"><FontAwesomeIcon icon={faWhatsapp} /></a> {/* WhatsApp icon */}
                <a href="#" className="github" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a> {/* GitHub icon */}
      </div>
    </div>
    </footer>
  );
}

export default Footer;


              