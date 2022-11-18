function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "66px",
        width: "100%",
      }}
    >
      
  <footer className="footer">
    <ul className="menu">
      <li className="menu__item"><a className="menu__link" href="https://github.com/MoniIgnacio/client-sibarita"><img src="https://res.cloudinary.com/dbrqv6ypj/image/upload/v1668759559/Sibarita-img/khtqyiuurkezv6apovbs.png" alt="img-git" width={'30px'} /></a></li>
      <li className="menu__item"><a className="menu__link" href="https://www.linkedin.com/in/jelle-manzano-haagsma-6a6785189/">Jelle <img src="https://res.cloudinary.com/dbrqv6ypj/image/upload/v1668760275/Sibarita-img/unhhwokhmybg5txkwjvk.png" alt="link-img" width={'15px'} style={{background:'white'}}/></a></li>
      <li className="menu__item"><a className="menu__link" href="https://www.linkedin.com/in/moniignacio02">Nacho <img src="https://res.cloudinary.com/dbrqv6ypj/image/upload/v1668760275/Sibarita-img/unhhwokhmybg5txkwjvk.png" alt="link-img" width={'15px'} style={{background:'white'}}/></a></li>
      <li className="menu__item"><a className="menu__link" href="https://drive.google.com/file/d/1DkO-J1p9rzbsSe1dQ77Iq3LnOvbVnR6n/view">Proyect video</a></li>

    </ul>
    <p>&copy; 2022 Jelle & Nacho | All Rights Reserved</p>
  </footer>
    </div>
  );
}

export default Footer;
