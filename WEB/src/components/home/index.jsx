import React, { useState, useEffect, useRef, fileRef } from "react";
// import { Link, Navigate } from "react-router-dom";

import { Formik, useFormik } from "formik";
import * as yup from "yup";
import "./index.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   getAuth,
// } from "firebase/auth";
// import { auth } from "./firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let baseURI = "";
if (window.location.href.split(":")[0] === "http") {
  baseURI = `http://localhost:3003`;
} else {
  baseURI = `https://e-commerce-store-shehzad.up.railway.app`;
}
// const baseURI = `http://localhost:3003`;
// const baseURI =`https://e-commerce-store-shehzad.up.railway.app`

export default function Home(props) {
  // Material UI
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);//////
  const [editingProduct, setEditingProduct] = useState(false);//////
  const [productData, setProductData] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

  //geting All Users
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${baseURI}/products`);
      setProductData(response.data.data);
      console.log(response.data.data);
    })();
  }, [toggleRefresh]);

  //formik validation
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
      productImg: "",
    },

    validationSchema: yup.object({
      productName: yup
        .string("Enter your Product Name")
        // .email("Enter your email")
        .required("Product Name is required")
        .min(3, "Please enter more then 3 characters ")
        .max(35, "Please enter within 35 characters"),
      productDescription: yup
        .string("Enter your classDays")
        .required("classDays is required")
        .min(3, "Please enter more then 3 characters ")
        .max(60, "Please enter within 60 characters "),
      productPrice: yup
        .number("Enter Product Price in number")
        .required("Product Price is required")
        .min(1, "Product Price can't be less then 1")
        .max(20000000, "Product Price can't be greater then 200")
        .positive("Product Price can't be negative"),
        // .integer("Enter Product Price without decimal"),
      // productImg: yup
      //   //  .string()
      //   .test(
      //     "FILE_SIZE",
      //     "Too large image size",
      //     (value) => value && value.size < 3600 * 3600
      //   )
      //   .test(
      //     "FILE_TYPE",
      //     "Invalid image type",
      //     (value) =>
      //       value &&
      //       ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      //   ),
      createdOn: yup.date().default(() => new Date()),
    }),

    onSubmit: async (values) => {
      // console.log(values);//values of formik
      const productImg = document.querySelector("#productImg");

      //to send form body instead of JSON body
      let formData = new FormData(); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax
      formData.append("productName", values.productName); // this is how you add some text data along with file
      formData.append("productDescription", values.productDescription);
      formData.append("productPrice", values.productPrice);
      formData.append("productImg", productImg.files[0]); // file input is for browser only, use fs to read file in nodejs client
      // console.log(productImg.files[0]);//image data
      try {
        const res = await axios({
          // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
          method: "post",
          url: `${baseURI}/product`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          // withCredentials: true
        });

        console.log(`upload Success  ` + res.data.message);
        toast(`${res.data.message}`);//https://www.npmjs.com/package/react-toastify
        setToggleRefresh(!toggleRefresh);
        handleOpenClose();
        // axios.post(`${baseURI}/product`, {
        //   name: values.productName,
        //   price: values.productPrice,
        //   description: values.productDescription,
        // });
      } catch (err) {
        console.log(err);
        toast(`Image not found ${err.message}`)
      }
      //do something like there you can call API or send data to firebase
      // if (errors) console.log("error is", errors);
    },
  });
const deleteProduct =async (id)=>{
  try {
    const res = await axios({
                          // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
      method: "post",
      url: `${baseURI}/product`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      // withCredentials: true
    });
  } catch (err) {
    console.log(err);
    toast(`Image not found ${err.message}`)
  }
}

const editMode=(product)=>{
  setIsEditMode(!isEditMode)
setEditingProduct(product)
}
  const handlePicChange = (e) => {
    // to display imager instantly on screen
    const profilePictureInput = document.querySelector("#productImg");
    const url = URL.createObjectURL(profilePictureInput.files[0]);
    console.log("img url: ", url);
    document.querySelector(
      "#previewProductImg"
    ).innerHTML = `<img width="200px" src="${url}" alt="" id="img"/> `;
    setFieldValue("productImg", e.target.files[0]);
    console.log(e.target.files);
  };
  return (
    <>
      <ToastContainer />
      <nav>
        <h1>Hello 1</h1>
        <Button variant="contained" onClick={handleOpenClose}>
          Add Product
        </Button>
        <Button variant="contained" onClick={setToggleRefresh}>
          refresh
        </Button>
        <Modal
          open={open}
          onClose={handleOpenClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit} className="modalForm1">
              <label htmlFor="productName" className="placeholder">
                Product Name
              </label>
              <input
                className="input"
                type="text"
                autoComplete="on"
                id="productName"
                placeholder="Your Product Name..."
                name="productName"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.productName && Boolean(errors.productName) ? (
                <span className="errorSpan">{errors.productName}</span>
              ) : null}

              <label htmlFor="productDescription" className="placeholder">
                Product Description
              </label>
              <input
                className="input"
                type="text"
                autoComplete="on"
                id="productDescription"
                placeholder="Your Product Description..."
                name="productDescription"
                value={values.productDescription}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.productDescription &&
              Boolean(errors.productDescription) ? (
                <span className="errorSpan">{errors.productDescription}</span>
              ) : null}

              <label htmlFor="productPrice" className="placeholder">
                Product Price
              </label>
              <input
                className="input"
                type="text"
                autoComplete="on"
                id="productPrice"
                placeholder="Your Product Price..."
                name="productPrice"
                // value={values.productPrice}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.productPrice && Boolean(errors.productPrice) ? (
                <span className="errorSpan">{errors.productPrice}</span>
              ) : null}

              <label htmlFor="productImg" className="placeholder">
                Product Picture
              </label>
              <input
                className="input"
                type="file"
                accept="image/*"
                // ref={fileRef}
                autoComplete="on"
                id="productImg"
                placeholder="Product Picture..."
                // name="productImg"
                // value={values.productImg}
                onChange={handlePicChange}
                // onBlur={handleBlur}
              />
              {/* {touched.name && Boolean(errors.courseName) ? (
                <span className="errorSpan">{errors.courseName}</span>
              ) : null} */}
              <div id="previewProductImg" alt=""></div>
              <button type="submit" className="submitBtn">
                SUBMIT
              </button>
            </form>
          </Box>
        </Modal>
        {/* <button onClick={async () => await signOut(auth)}>LogOut</button> */}
      </nav>
      {loading ? (
        <div className="loadingDiv">
          loading...
          {/* <img src={loadingGif} className="loadingGif" alt="Loading" /> */}
        </div>
      ) : null}
      {err ? <div className="errorr">{err}</div> : ""}

      {!productData
        ? null
        : productData?.map((eachProduct, index) => (
            <div className="productDataDiv" key={index}>
              <h1>product Name: {eachProduct.productName}</h1>
              <h3>{eachProduct.productPrice}</h3>
              <p>{eachProduct.productDescription}</p>
              <img
                src={eachProduct.productImg}
                alt="productImg"
                width="200px"
                height="200px"
              />
              <button onClick={()=>deleteProduct(eachProduct.id)}>Delete</button>
              {/* <button onClick={()=>{eachProduct.id}}>Edit</button> */}
              {/* {()} */}
              <hr />
            </div>
          ))}
      {/* <Button variant="contained">
          <Link to="/attendance">Attendance</Link>
        </Button>
        <br />
        <Button variant="contained">
          <Link to="/courses">Courses</Link>
        </Button>
        <br />
        <Button variant="contained">
          <Link to="/students">Students</Link>
        </Button> */}
      {/* <Link to="/showAllCourses">showAllCourses</Link> */}
      {/* <Link to="/login">LogIn</Link>
      <Link to="/signup">SignUp</Link> */}
    </>
  );
}
