import React from "react"; // Importing React library
import { Button } from "react-bootstrap"; // Importing Button component from react-bootstrap
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function for navigation

  return (
    <div className="header">
      <div className="App-header">
        {/* Display a welcome message to the user */}
        <p>
          Welcome! to my booking App<br />
          We're glad you choose us for your healthcare needs.
          Please feel free to book an appointment at your convenience.
        </p>
        <br /><br /><br />
        <Button 
          style={{ 
            width: "20%", 
            padding:"10px", 
            background:"rgb(5, 49, 105)", 
            border: "1px solid rgb(5, 49, 105)", 
            color:"whitesmoke", 
            borderRadius:"3px",
            cursor:"pointer",
          }}
          // Navigate to the patients page when the button is clicked
          onClick={() => navigate("patients")}
        >
          NEXT
        </Button>
        <br />
      </div>
    </div>
  );
}

export default Home; // Exporting Home component
