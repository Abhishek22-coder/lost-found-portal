import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "",
    image: null,
  });


  useEffect(() => {
    fetchItems();
  }, []);


  const fetchItems = () => {

    axios
      .get("http://localhost:5000/api/items")

      .then((res) => {
        setItems(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };


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

      if (editingId) {

        await axios.put(
          `http://localhost:5000/api/items/${editingId}`,
          formData
        );

        alert("Item Updated Successfully");

        setEditingId(null);

      } else {

        await axios.post(
          "http://localhost:5000/api/items/add",
          data
        );

        alert("Item Added Successfully");
      }

      fetchItems();

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


  const deleteItem = (id) => {

    axios
      .delete(`http://localhost:5000/api/items/${id}`)

      .then(() => {

        alert("Item Deleted");

        fetchItems();

      })

      .catch((err) => {

        console.log(err);

      });
  };


  const editItem = (item) => {

    setEditingId(item._id);

    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      location: item.location,
      status: item.status,
      image: null,
    });
  };


  return (

    <div className="container">

      <h1 className="title">
        Lost & Found Portal
      </h1>


      <form
        onSubmit={handleSubmit}
        className="form-box"
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />


        <input
          type="file"
          name="image"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }
        />


        <button type="submit">
          {editingId ? "Update Item" : "Add Item"}
        </button>

      </form>


      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}

        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />


      {items

        .filter((item) =>
          item.title
            .toLowerCase()
            .includes(search.toLowerCase())
        )

        .map((item) => (

          <div
            key={item._id}
            className="card"
          >

            {item.image && (

              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt=""
                width="250"
              />

            )}


            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <p>
              <b>Category:</b> {item.category}
            </p>

            <p>
              <b>Location:</b> {item.location}
            </p>

            <p>
              <b>Status:</b> {item.status}
            </p>


            <button
              onClick={() => editItem(item)}
            >
              Edit
            </button>


            <button
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>

          </div>
        ))}
    </div>
  );
}

export default App;