import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [usn, setUsn] = useState("");

  const [dob, setDob] = useState("");


  const handleCheck = () => {

    if (!usn || !dob) {

      alert("Please enter USN and DOB");

      return;
    }

    navigate("/check");
  };


  const handleAdd = () => {

    if (!usn || !dob) {

      alert("Please enter USN and DOB");

      return;
    }

    navigate("/add");
  };


  return (

    <div
      style={{

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(to right, #4facfe, #00f2fe)",

      }}
    >

      <div
        style={{

          background: "white",

          padding: "40px",

          borderRadius: "15px",

          width: "350px",

          textAlign: "center",

        }}
      >

        <h1>

          Lost & Found Portal

        </h1>


        <input
          type="text"
          placeholder="Enter USN"
          value={usn}
          onChange={(e) =>
            setUsn(e.target.value)
          }

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "20px",

          }}
        />


        <input
          type="date"
          value={dob}
          onChange={(e) =>
            setDob(e.target.value)
          }

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "20px",

          }}
        />


        <button
          onClick={handleCheck}

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

            background: "#007bff",

            color: "white",

            border: "none",

            cursor: "pointer",

          }}
        >

          Check Lost Item

        </button>


        <button
          onClick={handleAdd}

          style={{

            width: "100%",

            padding: "12px",

            background: "green",

            color: "white",

            border: "none",

            cursor: "pointer",

          }}
        >

          Add Found Item

        </button>

      </div>
    </div>
  );
}

export default LoginPage;