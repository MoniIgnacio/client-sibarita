function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "68px",
        width: "100%",
      }}
    >
      
  <footer className="footer">
    <ul className="menu">
      <li className="menu__item"><a className="menu__link" href="#">Client</a></li>
      <li className="menu__item"><a className="menu__link" href="#">Server</a></li>
      <li className="menu__item"><a className="menu__link" href="#">About</a></li>
      <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
      <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>

    </ul>
    <p>&copy; 2022 Jelle & Nacho | All Rights Reserved</p>
  </footer>
    </div>
  );
}

export default Footer;
