import React,
{
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


function LoginPage() {

  const navigate =
    useNavigate();

  const [usn, setUsn] =
    useState("");

  const [dob, setDob] =
    useState("");

  const [error, setError] =
    useState("");


  const validateLogin = () => {

    if (!usn || !dob) {

      setError(
        "Please fill all fields"
      );

      return false;
    }


    const usnPattern =
      /^[0-9]{1}[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;


    if (
      !usnPattern.test(
        usn.toUpperCase()
      )
    ) {

      setError(
        "Enter Valid USN"
      );

      return false;
    }


    setError("");

    return true;
  };


  const handleCheck = () => {

    if (
      validateLogin()
    ) {

      localStorage.setItem(
        "userUSN",
        usn.toUpperCase()
      );

      navigate("/check");
    }
  };


  const handleAdd = () => {

    if (
      validateLogin()
    ) {

      localStorage.setItem(
        "userUSN",
        usn.toUpperCase()
      );

      navigate("/add");
    }
  };


  return (

    <div
      style={{

        height: "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        background:
          "linear-gradient(to right,#4facfe,#00f2fe)",
      }}
    >

      <div
        style={{

          background:
            "white",

          padding:
            "40px",

          borderRadius:
            "20px",

          width: "400px",

          textAlign:
            "center",

          boxShadow:
            "0 5px 15px rgba(0,0,0,0.3)",
        }}
      >

        <h1
          style={{
            marginBottom:
              "30px",
          }}
        >

          Lost & Found Portal

        </h1>


        <input
          type="text"

          placeholder="Enter USN"

          value={usn}

          onChange={(e) =>
            setUsn(
              e.target.value
            )
          }

          style={inputStyle}
        />


        <input
          type="date"

          value={dob}

          onChange={(e) =>
            setDob(
              e.target.value
            )
          }

          style={inputStyle}
        />


        {
          error && (

            <p
              style={{

                color: "red",

                marginBottom:
                  "15px",

                fontWeight:
                  "bold",
              }}
            >

              {error}

            </p>
          )
        }


        <button
          onClick={
            handleCheck
          }

          style={checkBtn}
        >

          Check Lost Item

        </button>


        <button
          onClick={
            handleAdd
          }

          style={addBtn}
        >

          Add Found Item

        </button>

      </div>
    </div>
  );
}


const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "20px",

  borderRadius: "10px",

  border:
    "1px solid gray",

  fontSize: "15px",
};


const checkBtn = {

  width: "100%",

  padding: "14px",

  marginBottom: "15px",

  background: "#007bff",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  fontSize: "16px",
};


const addBtn = {

  width: "100%",

  padding: "14px",

  background: "green",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  fontSize: "16px",
};


export default LoginPage;