"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var fs_1 = require("fs");
var firebase_admin_1 = require("firebase-admin");
var app = (0, express_1["default"])();
var port = process.env.PORT || 3003;
//middleware configuration
app.use(express_1["default"].json());
app.use((0, cors_1["default"])()); //origin: ['http://localhost:3000', 'https://ecom-25516.web.app', "*"],
// https://firebase.google.com/docs/storage/admin/start
var serviceAccount = {
    type: "service_account",
    project_id: "e-commerce-shehzad",
    private_key_id: "acd1fac7c0b01bb7dd4194ef07d4508558106223",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOYqEVvR0FsZIp\nzoe2lxQuNrUajhUXRup1W6JGvSHCVU7Bc7PnlopmlWvSVmyNw3WnmmF6gKk04suU\n7bPiS5CGgiND9tPa5OBEtotGUTGgrHhwgZPNrbRM2SXPii2VCUApGWuoVCQ5kL6E\nVDKYOiS12JXchOHDCf8koHokYYPwMB537r0kjxBrgssWjRgV+8RKCyof4C/SPW+A\nb3lcPEjuwsr1PpoLgabEUBIDRZUkl5TH6p4DYlDTlKatJCK46xendbZHLW+NVmJY\nxrfCB/X6ozldIG5fFhEn0iaJ30sS6M93mBFn76BB4dDDEIHLvD3QMSWKxblmAbPC\ntIP+b+QnAgMBAAECggEAJxjPCaSVkQgqzd7/pfQDHxN3lDSadvtKivIf85Ogbve0\nuer25esQ0s1Jv4ZqpVyb9GswRA6LJ9H0u86ve75rD3wxicp/btY0/LkxMhw+Z9Oj\n+KSj/LCrVwSzXLMhBBD3tLFdvelozwO/RJ/ICsPAa8xujhBQ25jlnd2Q3GeIbo2n\nBTS36TXzNGYIsd+tClfOTozBuc7CfrINtR4TAHHLPh+/r5ZgDuD0K2cBc2XLhTEK\ngP13frMVV3Mbnet4z9xWTObRP1qRYlbcpFdNZqPBsMBW3ucZD+cp+p0sjAw/JS13\nMCqrAhzx2KNi8ide9GJGQA5wkuE+IGOEcf8vuzsIUQKBgQDHantEoFONLGP0zYy/\nLbx1Ezp8lpAh6s85F/sPVgaG40YxglGI6Xg1wP7q1pUL9jWpuczzIiL873IHIFtm\nOzjW6Nj18FuLtCKLEexrZtbROeXAg5IqSyokE28OABMo0NQ4b7K11CVFlHR4woO+\nq996nLz5yidh0T7JPCkcUUofkQKBgQC2yXSfE5ZuS00rSRarM/zPE9VDA0jk+iMA\nkXE7peA8r7zYgcxYduoxn/umrKsWq8SDp5WBc7jUWXaMGlf1SF5s2vZtsvv1moGJ\nCDeomqai/gnggndI4QaQx2F6m43Zwe0JfycV38VgMiSpvi6dTTX8E/vRp/B9IM/o\nF77FYftcNwKBgBSKvH36QgEV5IoQLoJ3FKW+wFSbMee8h3IrLTqMMwnsGYv6D6oZ\n2r82zUulpR7hUu/T6u/UwWPqyoU/aQrj6NwCim7zPorqmHBY/VCm/FP7Mdad9w2S\nRpoGwnbfvRmEQYg6wV8Hpns/aqwR5X5buB6qTLEyiNIDuwMBxn5bRVZxAoGAYTUP\n3U2Icc2AE6YB9ThnmSTeBI5ppMRV+wZeJq+Xag63qpiUuPM8pvmC1mf7cMoWb0Gf\nY8HMKLoPLoEQB/Tdqpxj84D9N+dcPijtmK/uML5TOF+J2ms5l6NA9vhk3sqgKa3C\ndoKTsA3aq57loWgfbpieEihy38ikaLTAEq6CA88CgYEAl28JLeIBOaWwU0b1wl9I\nBX7hA77wM0Fws26tEeo1MHVc/X35sImTgx6PFBPYNewMxLxOLEaVPQSinSLK5VDo\nsDzpJgkISFVzmxDN6f4weWzEoMz4DF3chomnesNvwxlTXrwBz4SezJx7r9d7aNqP\nu+uzfgYI6xsnw+Lsqre4L7k=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-917lx@e-commerce-shehzad.iam.gserviceaccount.com",
    client_id: "105818104741000699452",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-917lx%40e-commerce-shehzad.iam.gserviceaccount.com"
};
firebase_admin_1["default"].initializeApp({
    credential: firebase_admin_1["default"].credential.cert(serviceAccount),
    databaseURL: "https://e-commerce-shehzad.firebaseio.com"
});
var bucket = firebase_admin_1["default"].storage().bucket("gs://e-commerce-shehzad.appspot.com");
//==============================================
var multer_1 = require("multer");
var storageConfig = multer_1["default"].diskStorage({
    // https://www.npmjs.com/package/multer#diskstorage
    destination: "./uploads/",
    filename: function (req, file, cb) {
        console.log("mul-file: ", file);
        cb(null, "".concat(new Date().getTime(), "-").concat(file.originalname));
    }
});
var upload = (0, multer_1["default"])({ storage: storageConfig });
//==============================================
var productModel = mongoose_1["default"].model("productSchema", new mongoose_1["default"].Schema({
    productName: { type: String, require: true },
    productDescription: String,
    productPrice: { type: Number, require: true },
    productImg: { type: String, required: false },
    // classID: String,
    createdDate: { type: Date, "default": Date.now }
}));
app.get("/", function (req, res) {
    res.send("Server for Shehzad e-commerce App!");
});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ this is for courses $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//to see all product list from database
app.get("/products", function (req, res) {
    productModel.find({}, function (err, data) {
        if (!err) {
            res.send({
                message: "here is you product list",
                data: data
            });
        }
        else {
            res.status(500).send({
                message: "server error"
            });
        }
    });
});
//to add new product in Database
app.post("/product", upload.any(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = req.body;
        console.log("body: ", body);
        console.log("file: ", req.files[0]);
        if (!body.name || !body.email || !body.password) {
            res.status(400).send("required fields missing, request example: \n              {\n                  \"name\": \"John\",\n                  \"email\": \"abc@abc.com\",\n                  \"password\": \"12345\"\n              }");
            return [2 /*return*/];
        }
        // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
        bucket.upload(req.files[0].path, {
            destination: "profilePhotos/".concat(req.files[0].filename)
        }, function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);
                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file
                    .getSignedUrl({
                    action: "read",
                    expires: "03-09-2491"
                })
                    .then(function (urlData, err) {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]); // this is public downloadable url
                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs_1["default"].unlinkSync(req.files[0].path);
                            //file removed
                        }
                        catch (err) {
                            console.error(err);
                        }
                        // check if user already exist // query email user
                        userModel.findOne({ email: body.email }, function (err, user) {
                            if (!err) {
                                console.log("user: ", user);
                                if (user) {
                                    // user already exist
                                    console.log("user already exist: ", user);
                                    res
                                        .status(400)
                                        .send({
                                        message: "user already exist,, please try a different email"
                                    });
                                    return;
                                }
                                else {
                                    // user not already exist
                                    productModel.create({
                                        name: body.name,
                                        email: body.email.toLowerCase(),
                                        profilePicture: urlData[0]
                                    }, function (err, result) {
                                        if (!err) {
                                            console.log("data saved: ", result);
                                            res.status(201).send({
                                                message: "user is created",
                                                data: {
                                                    name: body.name,
                                                    email: body.email.toLowerCase(),
                                                    profilePicture: urlData[0]
                                                }
                                            });
                                        }
                                        else {
                                            console.log("db error: ", err);
                                            res
                                                .status(500)
                                                .send({ message: "internal server error" });
                                        }
                                    });
                                }
                            }
                        });
                        //gg
                    }
                }, {
                    console: console,
                    : .log("db error: ", err),
                    res: res,
                    : .status(500).send({ message: "db error in query" }),
                    "return": 
                });
            }
        });
        return [2 /*return*/];
    });
}); });
{
    console.log("err: ", err);
    res.status(500).send();
}
;
;
// to edit any course in Database
app.put("/course/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
// delete all courses in Database
app["delete"]("/courses", function (req, res) {
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
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
//MongoDB
var dbURI = process.env.MongoDBURI ||
    "mongodb+srv://shehza-d:web123@cluster0.egqvqca.mongodb.net/ecomme?retryWrites=true&w=majority";
await mongoose_1["default"].connect(dbURI);
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
