import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { useFormik } from "formik";
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
const baseURI = "http://localhost:3004";
export default function Home(props) {
  // Material UI
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [productData, setProductData] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

  //geting All Users
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${baseURI}/products`);
      setProductData(response.data.data);
    })();
  }, [toggleRefresh]);

  //formik validation
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
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
          .positive("Product Price can't be negative")
          .integer("Enter Product Price without decimal"),
        createdOn: yup.date().default(() => new Date()),
      }),

      onSubmit: async (values) => {
        console.log(values);
        try {
          await axios.post(`${baseURI}/product`, {
            name: values.productName,
            price: values.productPrice,
            description: values.productDescription,
          });
        } catch (err) {
          console.log(err);
        }
        //do something like there you can call API or send data to firebase
        // if (errors) console.log("error is", errors);
      },
    });
  const handlePicChange = () => {
    ////// to display imager instantly on screen
    const profilePictureInput = document.querySelector("#productPic");
    const url = URL.createObjectURL(profilePictureInput.files[0]);
    console.log("url: ", url);
    document.querySelector(
      "#previewProductImg"
    ).innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `;
  };
  return (
    <>
      <nav>
        <h1>Hello 1</h1>
        {console.log(productData)}
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
                value={values.productPrice}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.productPrice && Boolean(errors.productPrice) ? (
                <span className="errorSpan">{errors.productPrice}</span>
              ) : null}

              <label htmlFor="productPic" className="placeholder">
                Product Picture
              </label>
              <input
                className="input"
                type="file"
                accept="image/*"
                autoComplete="on"
                id="productPic"
                placeholder="Product Picture..."
                name="productPic"
                // value={values.courseName}
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

              <div className="subtitle">by Shehzad</div>
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
      
      {//console.log(productData);
      productData?.map((eachProduct) => (
        <div className="productDataDiv">
          <h1>{eachProduct.name}</h1>
          <h3>{eachProduct.price}</h3>
          <p>{eachProduct.description}</p>
          
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
