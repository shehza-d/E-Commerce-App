import { productModel } from "../database/model.mjs";
const getAllDataFun = async (req, res) => {
  productModel.find({}, (err, data) => {
    if (!err) {
      res.send({
        message: "here is you product list",
        data: data,
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
};

const searchDataFun = async (req, res) => {
  // productModel.findOne({ _id: id }, (err, data) => {
    // productModel.find({ $text: { $search: "laptop" } }, (err, data) => {
      productModel.find({ productName: req.params.searchTerm  }, (err, data) => {
    if (!err) {
      if (data) {
        res.send({
          message: "data mil gya",
          data: data,
        });
      } else {
        res.send({ message: "data nhi mila" });
      }
    } else {
      console.log(err);
    }
  });
};
export { getAllDataFun, searchDataFun };
