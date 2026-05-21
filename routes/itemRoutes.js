const express = require("express");

const router = express.Router();

const multer = require("multer");

const Item = require("../models/Item");


// IMAGE STORAGE

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});


// ADD ITEM

router.post(
  "/add",
  upload.single("image"),

  async (req, res) => {

    try {

      const newItem = new Item({

        title: req.body.title,

        description:
          req.body.description,

        category: req.body.category,

        location: req.body.location,

        status: req.body.status,

        image: req.file
          ? req.file.filename
          : "",
      });

      await newItem.save();

      res.status(201).json(newItem);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);


// GET ITEMS

router.get("/", async (req, res) => {

  try {

    const items = await Item.find().sort({
      createdAt: -1,
    });

    res.json(items);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE ITEM

router.delete("/:id", async (req, res) => {

  try {

    await Item.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE ITEM

router.put("/:id", async (req, res) => {

  try {

    const updatedItem =
      await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedItem);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;