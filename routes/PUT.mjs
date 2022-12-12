import db from "../database/model.mjs";

const editDataFun = async (req, res) => {
  const body = req.body;
  try {
    await db
      .findByIdAndUpdate(req.params.id, {
        productName: body.productName,
        productDescription: body.productDescription,
        productPrice: body.productPrice,
      })
      .exec();
    // console.log(updatedData);
    res.send({ message: "Product updated Successfully" });
  } catch (err) {
    res.status(500).send("server errror product not updated");
  }
};
export default editDataFun;
