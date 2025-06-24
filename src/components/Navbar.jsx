import logo from "../assets/react.svg";


export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <img
        src={logo}
        alt="React Logo"
        style={{ height: "30px", marginRight: "16px", animation: "spin 2s linear infinite" }}
      />
      <a
        className="navbar-link"
        href="https://github.com/attila5287/dynamic-markers-jsx"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <i className="fab fa-github mx-2"></i>Github
      </a>
      <a
        className="navbar-link"
        href="https://dynamic-markers-jsx.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <i className="fas fa-globe mx-2"></i>Vercel
      </a>
      <a
        className="navbar-link"
        href="https://docs.mapbox.com/help/tutorials/dynamic-markers-react/?step=3"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <i className="fab fa-react mx-2"></i> Tutorial
      </a>
    </nav>
  );
}