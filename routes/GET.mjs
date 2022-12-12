import db from "../database/model.mjs";
const getAllDataFun = async (req, res) => {
  db.find({}, (err, data) => {
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

export default getAllDataFun;
