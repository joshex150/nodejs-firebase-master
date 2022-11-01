const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/create/:id", async (req, res) => {
  try {
    const id = req.body.id;
    const response = await User.add(req.body, id).then(function (docRef) {
      User.doc(docRef.id).update({ id: docRef.id });
    });
  } catch (error) {
    res.send(error);
    res.status(400).json({
      success: false,
      message: "Unsuccessful",
    });
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    await User.doc(req.params.id).update({ inStock: req.body.inStock });
    res.send({ msg: "Updated" });
  } catch (error) {
    res.send(error);
    res.status(400).json({
      success: false,
      message: "Unsuccessful",
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id || "no id";
    await User.doc(id).delete();
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Unsuccessful",
    });
  }
});

app.listen(process.env.PORT || 3001, () => console.log(`Up & Running ${process.env.PORT || 'localhost:3001'}`));
// app.listen(3001, () => console.log(`Up & Running ${process.env.PORT || 'localhost:3001'}`));
