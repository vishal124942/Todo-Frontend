import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { server } from "../utils/constants";
import toast from "react-hot-toast";
import { useContext } from "react";
import { Context } from "../main";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { IsAuthenticated, setIsAuthenticated, loading, setloading } =
    useContext(Context);
  const submitHandler = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);

      setIsAuthenticated(true);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setloading(false);
    }
  };

  if (IsAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
