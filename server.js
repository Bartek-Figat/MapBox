require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mbxStyles = require("@mapbox/mapbox-sdk/services/geocoding");
const { ObjectID } = require("mongodb");
const isLength = require("validator/lib/isLength");
const { errorTypes } = require("./errorTypes");
const { Methods } = require("./db");

const { accessToken } = process.env;

const geocodingClient = mbxStyles({ accessToken });

const server = express();
const Port = process.env.PORT || 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.get("/index", async (req, res, next) => {
  const data = await Methods.find();
  res.json({ data });
});

server.get("/api/details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Methods.findOne({ _id: ObjectID(id) });
    res.json({ data });
  } catch (e) {
    res.status(500).json({
      error: errorTypes.server,
    });
  }
});

server.post("/location", async (req, res, next) => {
  try {
    const { useCity } = req.body;

    if (!isLength(useCity)) return;

    const location = await geocodingClient
      .forwardGeocode({
        query: useCity,
        limit: 1,
      })
      .send();

    const { features } = location.body;
    const data = await Methods.insertOne({
      city: features[0].place_name,
      location: {
        type: "Point",
        coordinates: features[0].geometry.coordinates,
      },
    });

    res.json(data.ops[0]);
  } catch (e) {
    res.status(500).json({
      error: errorTypes.server,
    });
  }
});

server.listen(Port, () => {
  console.log(`Server on ${Port}`);
});
