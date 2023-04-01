import { useNavigate } from "react-router-dom";
import github from "../assests/github.png";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="logo">
        <h3
          onClick={() => {
            navigate("/home");
          }}
        >
          eGPT
        </h3>
      </div>
      <div className="icon">
        <img
          src={github}
          alt="github"
          onClick={() => {
            navigate("/about");
          }}
        />
      </div>
    </nav>
  );
};
