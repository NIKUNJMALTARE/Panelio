import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true } // URL string
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
