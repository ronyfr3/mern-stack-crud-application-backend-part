const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const postRoutes = require("./routes/posts");
const uploadRoute = require("./routes/uploadRoute");

const app = express();

app.use(
  bodyParser.json({
    limit: "100mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.use(cors());
//we need to specify routes below cors neither it will throw error as cors policy
app.use("/posts", postRoutes);
app.use("/api", uploadRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URL =
  "mongodb+srv://dokan1234:dokan1234@cluster0.tj9io.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log("server running on port", PORT))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
