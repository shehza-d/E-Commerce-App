import { productModel } from "../database/model.mjs";

const SECRET = process.env.SECRET || "topsecret";


const postDataFun = async (req, res) => {
    const body = req.body;
    // const img:any = req.files[0] ;
  
    // console.log("body: ", req);
    // console.log("file: ", req.files[0]);
    //(req.files[0].size) isper check lage ga for limit of MB
    if (!body.productName || !body.productDescription || !body.productPrice) {
      res.status(400).send(`Required fields missing`); //.statusMessage ="Image not found !";
      return;
    }
  
    // if (req.files[0]) {
    // bucket.upload(
    //   req.files[0].path,
    //   {
    //     destination:
    //     `productPhotos/${new Date().getTime()}-${req.files[0].originalname}`,
    //   },
    //   async (err, file, apiResponse) => {
    //     if (!err) {
    //       // console.log("api resp: ", apiResponse);
    //       await file.getSignedUrl({
    //         action: "read",
    //         expires: "03-09-2491",
    //       });
    //       async (urlData, err) => {
    //         if (!err) {
    //           console.log("public downloadable url: ", urlData[0]); // this is public downloadable url
    //           try {
    //             fs.unlinkSync(req.files[0].path); //file removed
    //           } catch (err) {
    //             console.error(err);
    //           }
    //           await productModel.create(
    //             {
    //               productName: body.productName,
    //               productDescription: body.productDescription,
    //               productPrice: body.productPrice,
    //               productImg: urlData[0],
    //             },
    //             (err, saved) => {
    //               if (!err) {
    //                 console.log("saved");
    //                 res.send({
    //                   message: "Your data is saved Successfully",
    //                 });
    //               } else {
    //                 res.status(500).send({
    //                   message: "error hy koi server ma",
    //                 });
    //               }
    //             }
    //           );
    //         } else {
    //           res.status(500).send({
    //             message: "serverrr hy koi server ma",
    //           });
    //           console.log("errr: ", err);
    //         }
    //       };
    //     } else {
    //       console.log("err: ", err);
    //       res.status(500).send("testing");
    //     }
    //   }
    // );
  
    await productModel.create(
      {
        productName: body.productName,
        productDescription: body.productDescription,
        productPrice: body.productPrice,
        productImg: "no image",
      },
      (err, saved) => {
        if (!err) {
          console.log("saved");
          res.send({
            message: "Your data is saved (without img)",
          });
        } else {
          res.status(500).send({
            message: "error hy koi server ma",
          });
        }
      }
    );
  }

 export default postDataFun