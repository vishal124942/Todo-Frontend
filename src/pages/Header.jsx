import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main";
import axios from "axios";
import { server } from "../utils/constants";
import toast from "react-hot-toast";
const Header = () => {
  const { IsAuthenticated, setIsAuthenticated, loading, setloading } =
    useContext(Context);
  const LogoutHandler = async () => {
    setloading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");

      setIsAuthenticated(false);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setloading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {IsAuthenticated ? (
          <button disabled={loading} onClick={LogoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
