import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`room/${value}`, { state: { name: name } })
  }
  return (
    <>
      <div className="home">
        <h1 className="heading">Welcome to Video Call App</h1>
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name here..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={value}
          style={{ marginTop: "10px" }}
          placeholder="Enter Room Id here..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleChange}>Join Room</button>
      </div>
    </>
  );
};

export default Home;
