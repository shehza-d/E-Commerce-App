import { productModel } from "../database/model.mjs";

const deleteAllDataFun = async (req, res) => {
  await productModel.deleteMany({}, (err) => {
    if (!err) {
      res.send("All products Deleted");
    } else {
      res.status(500).send({ message: "server error" });
    }
  });
};
const deleteOneData = async (req, res) => {
  // deleteOne se phale wala delete ho kar req wapas aayae gyi
  try {
    await db.deleteOne({ _id: req.params.id }, (err, deletedData) => {
      console.log("deleted: ", deletedData);
      if (!err) {
        if (deletedData.deletedCount !== 0) {
          res.send({ message: "One product has been deleted successfully" });
        } else {
          res.send({ message: "No product found with this id " });
        }
      } else {
        res.status(500).send({ message: "server error Not deleted" });
      }
    });
  } catch (err) {
    console.log("error: ", err);
  }
};
export { deleteAllDataFun, deleteOneData };
