import React, { useEffect, useState } from "react";
import axios from "axios";

function CheckLostItem() {

  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");


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


  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <div
      style={{

        minHeight: "100vh",

        padding: "30px",

        background:
          "linear-gradient(to right, #2193b0, #6dd5ed)",

      }}
    >

      <h1
        style={{

          color: "white",

          textAlign: "center",

          marginBottom: "30px",

        }}
      >

        Check Lost Items

      </h1>


      <input
        type="text"
        placeholder="Search item..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }

        style={{

          width: "100%",

          padding: "15px",

          borderRadius: "10px",

          border: "none",

          marginBottom: "30px",

        }}
      />


      {filteredItems.length === 0 ? (

        <h2
          style={{

            color: "white",

            textAlign: "center",

          }}
        >

          Item not found

        </h2>

      ) : (

        filteredItems.map((item) => (

          <div
            key={item._id}

            style={{

              background: "white",

              padding: "20px",

              marginBottom: "20px",

              borderRadius: "15px",

            }}
          >

            {item.image && (

              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt=""
                width="250"
                style={{
                  borderRadius: "10px",
                }}
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
              style={{

                background: "orange",

                color: "white",

                border: "none",

                padding: "10px",

                marginRight: "10px",

                cursor: "pointer",

              }}
            >

              Edit

            </button>


            <button
              onClick={() =>
                deleteItem(item._id)
              }

              style={{

                background: "red",

                color: "white",

                border: "none",

                padding: "10px",

                cursor: "pointer",

              }}
            >

              Delete

            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default CheckLostItem;