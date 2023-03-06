import express from "express";
import connectDB from "./config/db.js";
import ReviewModel from "./models/Review.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
connectDB();
app.use('/',async(req,res)=>{
  try {
    const data = await ReviewModel.find();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})
app.use('/AddReview',async(req,res)=>{
  try {
    const { name, review, rate } = req.body;
    const data = await ReviewModel.create({ name, review, rate });
    return res.status(201).json({ message: "Review added successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})
app.use('/deleteReview/:id',async(req,res)=>{
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.json({ message: "Review deleted successfully", data: deletedReview });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})


// app.use('/', bookingRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));
