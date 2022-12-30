import { userModel } from "../database/model.mjs";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";


const SECRET = process.env.SECRET || "topsecret";


const router = express.Router()

router.post('/signup', async (req, res) => {
    // const createUserFun = async (req, res) => {
    let body = req.body;
    console.log(body);

    // null check - undefined, "", 0 , false, null , NaN
    if (
        !body.age ||
        !body.address ||
        !body.name ||
        !body.userPhoneNumber ||
        !body.email ||
        !body.password
    ) {
        res.status(400).send(`required fields missing,`);
        return;
    } else {
        // check if user already exist // query email user
        userModel.findOne({ email: body.email }, async (err, data) => {
            if (!err) {
                console.log("data: ", data);

                // user already exist
                if (data) {
                    console.log("user already exist: ", data);
                    res.status(400);
                    res.send({ message: "User already exists, Try different email" });
                    return;
                } else {
                    // user not already exist

                    const hashString = await stringToHash(body.password);
                    userModel.create(
                        {
                            name: body.name,
                            age: body.age,
                            email: body.email.toLowerCase(),
                            password: hashString,
                            websiteURL: body.websiteURL,
                            address: body.address,
                            userPhoneNumber: body.userPhoneNumber,
                        },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "User is created" });
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        }
                    );
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "db error in query" });
                return;
            }
        });
    }
});
router.post('/signup', async (req, res) => {

    console.log("login fun");
    const body = req.body;
    if (!body.email || !body.password) {
        res.status(422).send({ message: `Required parameters are missing!` });
        return;
    }

    //check if user exist
    userModel.findOne(
        { email: body.email.toLowerCase() },
        "email password",//this is projection (if you want to exclude something use - like "-age")
        async (err, data) => {
            if (err) {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            } else {
                //console.log("data: ", data);
                if (!data) {
                    // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                } else {
                    // user found
                    const isMatched = await varifyHash(body.password, data.password);
                    console.log("isMatched: ", isMatched);
                    if (isMatched) {
                        const token = jwt.sign(
                            {
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,//security
                            },
                            SECRET
                        );

                        console.log("token: ", token);//it's a security vulnerability to print token in production 

                        res.cookie("Token", token, {
                            maxAge: 86_400_000,//for browser and user experience 
                            httpOnly: true,
                            sameSite: true,
                            secure: true
                        });

                        res.send({
                            message: "Login successful",
                            profile: {
                                email: data.email,
                                name: data?.firstName,
                                lastName: data?.lastName,
                                age: data?.age,
                                _id: data._id,
                            },
                        });
                        return;
                    } else {
                        console.log("password did not match");
                        res.status(401).send({ message: "Incorrect Password" });
                        return;
                    }
                }
            }
        }
    );
});

router.post("/logout", (req, res) => {
    res
        .status(401)
        .cookie("Token", "", {
            maxAge: 1,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        .send({ message: "Logout Successful" });
});
// const postDataFun = async (req, res) => {
//     const body = req.body;
//     // const img:any = req.files[0] ;

//     // console.log("body: ", req);
//     // console.log("file: ", req.files[0]);
//     //(req.files[0].size) isper check lage ga for limit of MB
//     if (!body.productName || !body.productDescription || !body.productPrice) {
//       res.status(400).send(`Required fields missing`); //.statusMessage ="Image not found !";
//       return;
//     }

//     // if (req.files[0]) {
//     // bucket.upload(
//     //   req.files[0].path,
//     //   {
//     //     destination:
//     //     `productPhotos/${new Date().getTime()}-${req.files[0].originalname}`,
//     //   },
//     //   async (err, file, apiResponse) => {
//     //     if (!err) {
//     //       // console.log("api resp: ", apiResponse);
//     //       await file.getSignedUrl({
//     //         action: "read",
//     //         expires: "03-09-2491",
//     //       });
//     //       async (urlData, err) => {
//     //         if (!err) {
//     //           console.log("public downloadable url: ", urlData[0]); // this is public downloadable url
//     //           try {
//     //             fs.unlinkSync(req.files[0].path); //file removed
//     //           } catch (err) {
//     //             console.error(err);
//     //           }
//     //           await productModel.create(
//     //             {
//     //               productName: body.productName,
//     //               productDescription: body.productDescription,
//     //               productPrice: body.productPrice,
//     //               productImg: urlData[0],
//     //             },
//     //             (err, saved) => {
//     //               if (!err) {
//     //                 console.log("saved");
//     //                 res.send({
//     //                   message: "Your data is saved Successfully",
//     //                 });
//     //               } else {
//     //                 res.status(500).send({
//     //                   message: "error hy koi server ma",
//     //                 });
//     //               }
//     //             }
//     //           );
//     //         } else {
//     //           res.status(500).send({
//     //             message: "serverrr hy koi server ma",
//     //           });
//     //           console.log("errr: ", err);
//     //         }
//     //       };
//     //     } else {
//     //       console.log("err: ", err);
//     //       res.status(500).send("testing");
//     //     }
//     //   }
//     // );

//     await productModel.create(
//       {
//         productName: body.productName,
//         productDescription: body.productDescription,
//         productPrice: body.productPrice,
//         productImg: "no image",
//       },
//       (err, saved) => {
//         if (!err) {
//           console.log("saved");
//           res.send({
//             message: "Your data is saved (without img)",
//           });
//         } else {
//           res.status(500).send({
//             message: "error hy koi server ma",
//           });
//         }
//       }
//     );
//   }
export default router