import express from "express";
import path from 'path';
import cors from "cors";
// import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3003;
//middleware configuration
app.use(express.json());
app.use(cors());

// const courseModel = mongoose.model(
//   "courseSchema",
//   new mongoose.Schema({
//     courseName: { type: String, require: true },
//     // classDays: { type: String, require: true },
//     // teacherName: { type: String, require: true },
//     // sectionName: { type: String, require: true },
//     // batchNumber: { type: Number, require: true },
//     classID: String,
//     createdDate: { type: Date, default: Date.now },
//   })
// );

app.get("/", (req: express.Request, res: express.Response): void => {
  res.send(`Server for Shehzad e-commerce App!`);
});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ this is for courses $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//to see all courses list from database
app.get("/course", (req, res) => {
  
  // courseModel.find({}, (err: Error, data: any) => {
  //   if (!err) {
  //     res.send({
  //       message: "here is you courses list",
  //       data: data,
  //     });
  //   } else {
  //     res.status(500).send({
  //       message: "server error",
  //     });
  //   }
  // });
});

//to add new courses in Database
app.post("/course", async (req, res) => {
  console.log(req.body);
  // await courseModel.create({ course: req.body.text }, (err, saved) => {
  //   if (!err) {
  //     console.log("saved");
  //     res.send({
  //       message: "your data is saved",
  //     });
  //   } else {
  //     res.status(500).send({
  //       message: "error hy koi server ma",
  //     });
  //   }
  // });
});

// to edit any course in Database
app.put("/course/:id", async (req, res) => {
  // try {
  //   const updatedData = await courseModel
  //     .findByIdAndUpdate(req.params.id, { text: req.body.text })
  //     .exec();
  //   console.log(updatedData);
  //   res.send({
  //     message: "course has been updated successfully",
  //     data: updatedData,
  //   });
  // } catch (err) {
  //   res.status(500).send({ message: "server errror" });
  // }
});

// delete all courses in Database
app.delete("/courses", (req, res) => {
  // courseModel.deleteMany({}, (err) => {
  //   if (!err) {
  //     res.send({ message: "all course deleted successfully" });
  //   } else {
  //     res.status(500).send({ message: "server error" });
  //   }
  // });
});

// //to delete selected courses
// //:id is URL parameter
// app.delete("/course/:id", (req, res) => {
//   courseModel.deleteOne({ _id: req.params.id }, (err, deletedData) => {
//     console.log("deleted: ", deletedData);

//     if (!err) {
//       if (deletedData.deletedCount !== 0) {
//         res.send({
//           message: "One Todo has been deleted successfully",
//         });
//       } else {
//         res.send({ message: "No todo found with this id " });
//       }
//     } else {
//       res.status(500).send({ message: "server error" });
//     }
//   });
// });

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ this is for Students $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//END
app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});

//MongoDB
// const dbURI =
//   "mongodb+srv://shehza-d:web123@cluster0.egqvqca.mongodb.net/firstdatabase?retryWrites=true&w=majority";
// await mongoose.connect(dbURI);

// //for status of DB
// ////////////////mongodb connected disconnected events///////////
// mongoose.connection.on(
//   "connected",
//   () => console.log("Mongoose is connected")
//   // process.exit(1);
// );

// mongoose.connection.on("disconnected", () => {
//   //disconnected
//   console.log("Mongoose is disconnected");
//   process.exit(1);
// });

// mongoose.connection.on("error", (err) => {
//   //any error
//   console.log("Mongoose connection error: ", err);
//   process.exit(1);
// });

// process.on("SIGINT", () => {
//   /////this function will run jst before app is closing
//   console.log("app is terminating");
//   mongoose.connection.close(function () {
//     console.log("Mongoose default connection closed");
//     process.exit(0);
//   });
// });
// //////////////mongodb connected disconnected events//////////
