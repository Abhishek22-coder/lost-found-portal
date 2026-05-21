import React,
{
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  toast,
} from "react-toastify";

import {
  useNavigate,
} from "react-router-dom";


function CheckLostItem() {

  const navigate =
    useNavigate();

  const userUSN =
    localStorage.getItem(
      "userUSN"
    );

  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({

      title: "",

      description: "",

      category: "",

      location: "",

      status: "",
    });


  useEffect(() => {

    fetchItems();

  }, []);


  const fetchItems = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/items"
        );

      setItems(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);
    }
  };


  const logout = () => {

    localStorage.removeItem(
      "userUSN"
    );

    navigate("/");
  };


  const deleteItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/items/${id}`
      );

      toast.success(
        "Item Deleted"
      );

      fetchItems();

    } catch (err) {

      console.log(err);
    }
  };


  const startEdit = (item) => {

    setEditingId(item._id);

    setEditData({

      title: item.title,

      description:
        item.description,

      category:
        item.category,

      location:
        item.location,

      status:
        item.status,
    });
  };


  const updateItem = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/items/${editingId}`,

        editData
      );

      toast.success(
        "Item Updated"
      );

      setEditingId(null);

      fetchItems();

    } catch (err) {

      console.log(err);
    }
  };


  const claimItem = async (item) => {

    try {

      await axios.put(

        `http://localhost:5000/api/items/${item._id}`,

        {
          ...item,

          status:
            "claimed",
        }
      );

      toast.success(
        "Item Claimed"
      );

      fetchItems();

    } catch (err) {

      console.log(err);
    }
  };


  const filteredItems =
    items.filter((item) => {

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "all"
          ? true
          : item.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });


  return (

    <div
      style={{

        minHeight: "100vh",

        padding: "30px",

        background:
          "linear-gradient(to right,#141e30,#243b55)",
      }}
    >

      <div
        style={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom:
            "30px",
        }}
      >

        <div>

          <h1
            style={{
              color: "white",
            }}
          >

            Lost & Found Dashboard

          </h1>

          <p
            style={{
              color: "white",
            }}
          >

            Welcome,
            {" "}
            {userUSN}

          </p>

        </div>


        <button
          onClick={logout}

          style={{

            padding:
              "12px 20px",

            background:
              "#e74c3c",

            color: "white",

            border: "none",

            borderRadius:
              "10px",

            cursor:
              "pointer",
          }}
        >

          Logout

        </button>

      </div>


      <input
        type="text"

        placeholder="Search Item"

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        style={{

          width: "100%",

          padding: "15px",

          borderRadius:
            "10px",

          border: "none",

          marginBottom:
            "20px",
        }}
      />


      <div
        style={{
          marginBottom:
            "30px",
        }}
      >

        <button
          onClick={() =>
            setFilter("all")
          }

          style={filterBtn}
        >

          All

        </button>


        <button
          onClick={() =>
            setFilter("lost")
          }

          style={filterBtn}
        >

          Lost

        </button>


        <button
          onClick={() =>
            setFilter("found")
          }

          style={filterBtn}
        >

          Found

        </button>


        <button
          onClick={() =>
            setFilter(
              "claimed"
            )
          }

          style={filterBtn}
        >

          Claimed

        </button>

      </div>


      {
        loading && (

          <h2
            style={{
              color:
                "white",
            }}
          >

            Loading...

          </h2>
        )
      }


      {
        filteredItems.length === 0
        && !loading && (

          <h2
            style={{
              color:
                "white",
            }}
          >

            Item not found

          </h2>
        )
      }


      {
        filteredItems.map((item) => (

          <div
            key={item._id}

            style={{

              background:
                "white",

              padding:
                "25px",

              borderRadius:
                "15px",

              marginBottom:
                "20px",
            }}
          >

            {
              editingId === item._id
              ? (

                <div>

                  <input
                    type="text"

                    value={
                      editData.title
                    }

                    onChange={(e) =>
                      setEditData({

                        ...editData,

                        title:
                          e.target.value,
                      })
                    }

                    style={inputStyle}
                  />


                  <input
                    type="text"

                    value={
                      editData.description
                    }

                    onChange={(e) =>
                      setEditData({

                        ...editData,

                        description:
                          e.target.value,
                      })
                    }

                    style={inputStyle}
                  />


                  <input
                    type="text"

                    value={
                      editData.category
                    }

                    onChange={(e) =>
                      setEditData({

                        ...editData,

                        category:
                          e.target.value,
                      })
                    }

                    style={inputStyle}
                  />


                  <input
                    type="text"

                    value={
                      editData.location
                    }

                    onChange={(e) =>
                      setEditData({

                        ...editData,

                        location:
                          e.target.value,
                      })
                    }

                    style={inputStyle}
                  />


                  <input
                    type="text"

                    value={
                      editData.status
                    }

                    onChange={(e) =>
                      setEditData({

                        ...editData,

                        status:
                          e.target.value,
                      })
                    }

                    style={inputStyle}
                  />


                  <button
                    onClick={
                      updateItem
                    }

                    style={saveBtn}
                  >

                    Save

                  </button>

                </div>

              )
              : (

                <div>

                  <h2>
                    {item.title}
                  </h2>

                  <p>
                    <b>
                      Description:
                    </b>
                    {" "}
                    {item.description}
                  </p>

                  <p>
                    <b>
                      Category:
                    </b>
                    {" "}
                    {item.category}
                  </p>

                  <p>
                    <b>
                      Location:
                    </b>
                    {" "}
                    {item.location}
                  </p>

                  <p>
                    <b>
                      Status:
                    </b>
                    {" "}
                    {item.status}
                  </p>

                  <p>
                    <b>
                      Date:
                    </b>
                    {" "}
                    {item.date}
                  </p>

                  <p>
                    <b>
                      Time:
                    </b>
                    {" "}
                    {item.time}
                  </p>


                  {
                    item.image && (

                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}

                        alt="item"

                        width="250"

                        style={{
                          borderRadius:
                            "10px",
                        }}
                      />
                    )
                  }


                  <br /><br />


                  <button
                    onClick={() =>
                      startEdit(item)
                    }

                    style={editBtn}
                  >

                    Edit

                  </button>


                  <button
                    onClick={() =>
                      claimItem(item)
                    }

                    style={claimBtn}
                  >

                    Claim

                  </button>


                  <button
                    onClick={() =>
                      deleteItem(
                        item._id
                      )
                    }

                    style={deleteBtn}
                  >

                    Delete

                  </button>

                </div>
              )
            }

          </div>
        ))
      }

    </div>
  );
}


const filterBtn = {

  padding: "10px 20px",

  marginRight: "10px",

  border: "none",

  borderRadius: "10px",

  background: "#3498db",

  color: "white",

  cursor: "pointer",
};


const editBtn = {

  padding: "10px 20px",

  marginRight: "10px",

  border: "none",

  borderRadius: "10px",

  background: "#f39c12",

  color: "white",

  cursor: "pointer",
};


const claimBtn = {

  padding: "10px 20px",

  marginRight: "10px",

  border: "none",

  borderRadius: "10px",

  background: "#2ecc71",

  color: "white",

  cursor: "pointer",
};


const deleteBtn = {

  padding: "10px 20px",

  border: "none",

  borderRadius: "10px",

  background: "#e74c3c",

  color: "white",

  cursor: "pointer",
};


const saveBtn = {

  padding: "10px 20px",

  border: "none",

  borderRadius: "10px",

  background: "#2ecc71",

  color: "white",

  cursor: "pointer",
};


const inputStyle = {

  width: "100%",

  padding: "12px",

  marginBottom: "15px",

  borderRadius: "10px",

  border:
    "1px solid gray",
};


export default CheckLostItem;