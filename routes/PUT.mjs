import { productModel } from "../database/model.mjs";
import mongoose from 'mongoose'

const editDataFun = async (req, res) => {
  const body = req.body;
  console.log("put req running", req.params.id);
  console.log("put req running", body);

  // if (!body.productName || !body.productDescription || !body.productPrice) {
  //   res.status(400).send(`Required fields missing`); //.statusMessage ="Image not found !";
  //   return;
  // }


  console.log("mongoose.isValidObjectId: ", mongoose.isValidObjectId(req.params.id))


  try {
    const data = await productModel
      .findByIdAndUpdate(
         req.params.id,
        {
          productName: body.productName,
          productDescription: body.productDescription,
          productPrice: body.productPrice,
        },
        { new: true }
      )
      .exec();
    // {new:true}
    //new true se new added data return hoga false se purana data mile ga
    // .sort({-1})
    //  1 assending order and -1 for desandaing order
    // console.log(updatedData);
    console.log("data ===>", data);
    res.send({ message: "Product updated Successfully" });
  } catch (err) {
    res.status(500).send("server errror product not updated");
  }
};
export default editDataFun;
