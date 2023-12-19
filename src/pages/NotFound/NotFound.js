import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page-container">
      <h1>404</h1>
      <p>Sorry, the page you requested could not be found.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
