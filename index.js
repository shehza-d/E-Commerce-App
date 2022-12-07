import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 3003;
//middleware configuration
app.use(express.json());
app.use(cors()); //{origin: ['http://localhost:3000', 'https://ecom-25516.web.app', "*"]},
// https://firebase.google.com/docs/storage/admin/start
const serviceAccount = {
    type: "service_account",
    project_id: "e-commerce-shehzad",
    private_key_id: "acd1fac7c0b01bb7dd4194ef07d4508558106223",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOYqEVvR0FsZIp\nzoe2lxQuNrUajhUXRup1W6JGvSHCVU7Bc7PnlopmlWvSVmyNw3WnmmF6gKk04suU\n7bPiS5CGgiND9tPa5OBEtotGUTGgrHhwgZPNrbRM2SXPii2VCUApGWuoVCQ5kL6E\nVDKYOiS12JXchOHDCf8koHokYYPwMB537r0kjxBrgssWjRgV+8RKCyof4C/SPW+A\nb3lcPEjuwsr1PpoLgabEUBIDRZUkl5TH6p4DYlDTlKatJCK46xendbZHLW+NVmJY\nxrfCB/X6ozldIG5fFhEn0iaJ30sS6M93mBFn76BB4dDDEIHLvD3QMSWKxblmAbPC\ntIP+b+QnAgMBAAECggEAJxjPCaSVkQgqzd7/pfQDHxN3lDSadvtKivIf85Ogbve0\nuer25esQ0s1Jv4ZqpVyb9GswRA6LJ9H0u86ve75rD3wxicp/btY0/LkxMhw+Z9Oj\n+KSj/LCrVwSzXLMhBBD3tLFdvelozwO/RJ/ICsPAa8xujhBQ25jlnd2Q3GeIbo2n\nBTS36TXzNGYIsd+tClfOTozBuc7CfrINtR4TAHHLPh+/r5ZgDuD0K2cBc2XLhTEK\ngP13frMVV3Mbnet4z9xWTObRP1qRYlbcpFdNZqPBsMBW3ucZD+cp+p0sjAw/JS13\nMCqrAhzx2KNi8ide9GJGQA5wkuE+IGOEcf8vuzsIUQKBgQDHantEoFONLGP0zYy/\nLbx1Ezp8lpAh6s85F/sPVgaG40YxglGI6Xg1wP7q1pUL9jWpuczzIiL873IHIFtm\nOzjW6Nj18FuLtCKLEexrZtbROeXAg5IqSyokE28OABMo0NQ4b7K11CVFlHR4woO+\nq996nLz5yidh0T7JPCkcUUofkQKBgQC2yXSfE5ZuS00rSRarM/zPE9VDA0jk+iMA\nkXE7peA8r7zYgcxYduoxn/umrKsWq8SDp5WBc7jUWXaMGlf1SF5s2vZtsvv1moGJ\nCDeomqai/gnggndI4QaQx2F6m43Zwe0JfycV38VgMiSpvi6dTTX8E/vRp/B9IM/o\nF77FYftcNwKBgBSKvH36QgEV5IoQLoJ3FKW+wFSbMee8h3IrLTqMMwnsGYv6D6oZ\n2r82zUulpR7hUu/T6u/UwWPqyoU/aQrj6NwCim7zPorqmHBY/VCm/FP7Mdad9w2S\nRpoGwnbfvRmEQYg6wV8Hpns/aqwR5X5buB6qTLEyiNIDuwMBxn5bRVZxAoGAYTUP\n3U2Icc2AE6YB9ThnmSTeBI5ppMRV+wZeJq+Xag63qpiUuPM8pvmC1mf7cMoWb0Gf\nY8HMKLoPLoEQB/Tdqpxj84D9N+dcPijtmK/uML5TOF+J2ms5l6NA9vhk3sqgKa3C\ndoKTsA3aq57loWgfbpieEihy38ikaLTAEq6CA88CgYEAl28JLeIBOaWwU0b1wl9I\nBX7hA77wM0Fws26tEeo1MHVc/X35sImTgx6PFBPYNewMxLxOLEaVPQSinSLK5VDo\nsDzpJgkISFVzmxDN6f4weWzEoMz4DF3chomnesNvwxlTXrwBz4SezJx7r9d7aNqP\nu+uzfgYI6xsnw+Lsqre4L7k=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-917lx@e-commerce-shehzad.iam.gserviceaccount.com",
    client_id: "105818104741000699452",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-917lx%40e-commerce-shehzad.iam.gserviceaccount.com",
};
// console.log("not avaliable"||process.env.serviceAccountFB);
if (process.env.serviceAccountFB)
    console.log("this in env variable", process.env.serviceAccountFB);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://e-commerce-shehzad.firebaseio.com",
// });
// const bucket = admin.storage().bucket("gs://e-commerce-shehzad.appspot.com");
//==============================================
import multer from "multer";
// new syntax ==== const upload =multer({ dest: './public/data/upload/'})
const storageConfig = multer.diskStorage({
    // https://www.npmjs.com/package/multer#diskstorage
    destination: "./uploads/",
    filename: (req, file, cb) => {
        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storageConfig });
//==============================================
const productModel = mongoose.model("productSchema", new mongoose.Schema({
    productName: { type: String, require: true },
    productDescription: String,
    productPrice: { type: Number, require: true },
    productImg: { type: String, required: false },
    // classID: String,
    createdDate: { type: Date, default: Date.now },
}));
app.get("/", (req, res) => {
    res.send(`Server for Shehzad e-commerce App!`);
});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ this is for courses $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//to see all product list from database
app.get("/products", (req, res) => {
    productModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "here is you product list",
                data: data,
            });
        }
        else {
            res.status(500).send({
                message: "server error",
            });
        }
    });
});
//to add new product in Database
app.post("/product", upload.any(), async (req, res) => {
    const body = req.body;
    console.log("body: ", body);
    // console.log("file: ", req.files[0]);
    // if (!body.name || !body.email || !body.password) {
    //   res.status(400).send(
    //     `required fields missing, request example:
    //             {
    //                 "name": "John",
    //                 "email": "abc@abc.com",
    //                 "password": "12345"
    //             }`
    //   );
    //   return;
    // }
    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    // bucket.upload(
    //   req.files[0].path,
    //   {
    //     destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
    //   },
    //   function (err, file, apiResponse) {
    //     if (!err) {
    //       // console.log("api resp: ", apiResponse);
    //       // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
    //       file
    //         .getSignedUrl({
    //           action: "read",
    //           expires: "03-09-2491",
    //         })
    //         .then((urlData, err) => {
    //           if (!err) {
    //             console.log("public downloadable url: ", urlData[0]); // this is public downloadable url
    //             // delete file from folder before sending response back to client (optional but recommended)
    //             // optional because it is gonna delete automatically sooner or later
    //             // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
    //             try {
    //               fs.unlinkSync(req.files[0].path);
    //               //file removed
    //             } catch (err) {
    //               console.error(err);
    //             }
    //             // check if user already exist // query email user
    //             productModel.findOne({ email: body.email }, (err, user) => {
    //               if (!err) {
    //                 console.log("user: ", user);
    //                 if (user) {
    //                   // user already exist
    //                   console.log("user already exist: ", user);
    //                   res.status(400).send({
    //                     message:
    //                       "user already exist,, please try a different email",
    //                   });
    //                   return;
    //                 } else {
    //                   // user not already exist
    //                   stringToHash(body.password).then((hashString) => {
    //                     userModel.create(
    //                       {
    //                         name: body.name,
    //                         email: body.email.toLowerCase(),
    //                         password: hashString,
    //                         profilePicture: urlData[0],
    //                       },
    //                       (err, result) => {
    //                         if (!err) {
    //                           console.log("data saved: ", result);
    //                           res.status(201).send({
    //                             message: "user is created",
    //                             data: {
    //                               name: body.name,
    //                               email: body.email.toLowerCase(),
    //                               profilePicture: urlData[0],
    //                             },
    //                           });
    //                         } else {
    //                           console.log("db error: ", err);
    //                           res
    //                             .status(500)
    //                             .send({ message: "internal server error" });
    //                         }
    //                       }
    //                     );
    //                   });
    //                 }
    //               } else {
    //                 console.log("db error: ", err);
    //                 res.status(500).send({ message: "db error in query" });
    //                 return;
    //               }
    //             });
    //           }
    //         });
    //     } else {
    //       console.log("err: ", err);
    //       res.status(500).send();
    //     }
    //   }
    // );
    await productModel.create({
        productName: body.productName,
        productDescription: body.productDescription,
        productPrice: body.productPrice,
    }, (err, saved) => {
        if (!err) {
            console.log("saved");
            res.send({
                message: "your data is saved",
            });
        }
        else {
            res.status(500).send({
                message: "error hy koi server ma",
            });
        }
    });
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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
console.log(process.env.MongoDBURI);
//MongoDB
const dbURI = process.env.MongoDBURI ||
    "mongodb+srv://shehza-d:web123@cluster0.egqvqca.mongodb.net/ecomme?retryWrites=true&w=majority";
mongoose.connect(dbURI);
//await removed
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
