const { Router } = require("express");
const PostModel = require("../models/post.model");

const postRoutes = Router();

postRoutes.get("/", async (req, res) => {
  try {
    const data = await PostModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


postRoutes.post("/appointments", async (req, res) => {
  try {
    const data = await new PostModel(req.body);
    await data.save();
    res.status(200).json({ msg: "Apponiments Booked" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


postRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "Data Update" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


postRoutes.delete("/delete/:id", async(req,res) => {
    const {id} = req.params;
    try {
        await PostModel.findByIdAndDelete({_id: id}, req.body)
        res.status(200).json({msg: "Data deleted"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = postRoutes;
