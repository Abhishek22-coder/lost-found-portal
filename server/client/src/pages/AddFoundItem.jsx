import React, { useState } from "react";
import axios from "axios";

function AddFoundItem() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "",
    image: null,
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("status", formData.status);

    if (formData.image) {

      data.append("image", formData.image);
    }

    try {

      await axios.post(
        "http://localhost:5000/api/items/add",
        data
      );

      alert("Item Added Successfully");

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        status: "",
        image: null,
      });

    } catch (err) {

      console.log(err);

    }
  };


  return (

    <div
      style={{

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(to right, #56ab2f, #a8e063)",

      }}
    >

      <form
        onSubmit={handleSubmit}

        style={{

          background: "white",

          padding: "40px",

          borderRadius: "15px",

          width: "400px",

        }}
      >

        <h1
          style={{
            textAlign: "center",
          }}
        >

          Add Found Item

        </h1>


        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

          }}
        />


        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

          }}
        />


        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

          }}
        />


        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

          }}
        />


        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

          }}
        />


        <input
          type="file"

          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }

          style={{
            marginBottom: "20px",
          }}
        />


        <button
          type="submit"

          style={{

            width: "100%",

            padding: "12px",

            background: "green",

            color: "white",

            border: "none",

            cursor: "pointer",

          }}
        >

          Add Item

        </button>

      </form>
    </div>
  );
}

export default AddFoundItem;