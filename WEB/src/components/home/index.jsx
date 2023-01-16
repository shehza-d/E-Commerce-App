import React, { useState, useEffect } from "react";
// import { Link, Navigate } from "react-router-dom";
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
//   getAuth, h
// } from "firebase/auth";
// import { auth } from "./firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowRight } from "react-icons/ai";

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
// const baseURI = `https://e-commerce-store-shehzad.up.railway.app`;

export default function Home(props) {
  // Material UI
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const [loading, setLoading] = useState(false);
  // const [err, setErr] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); //////
  const [editingProduct, setEditingProduct] = useState(false); //////
  const [productData, setProductData] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //geting All Users
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${baseURI}/products`);
      setProductData(res.data.data);
      console.log(res.data.data);
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
      setLoading(true);
      // console.log(values);//values of formik
      const productImg = document.querySelector("#productImg");

//alternative by anas       const data = new FormData(e.currentTarget); console.log({ email: data.get('email'), password: data.get('email'), });
      
      //form values ma saruf string aur file hi ja sagti hy aur kuxh nhi
      //
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
        toast(`${res.data.message}`); //https://www.npmjs.com/package/react-toastify
        setToggleRefresh(!toggleRefresh);
        handleOpenClose();
        // axios.post(`${baseURI}/product`, {
        //   name: values.productName,
        //   price: values.productPrice,
        //   description: values.productDescription,
        // });
      } catch (err) {
        console.log("my err", err);
        // console.log("my err",err.response.data);
        toast(err.response.data);
      }
      //do something like there you can call API or send data to firebase
      // if (errors) console.log("error is", errors);
      setLoading(false);
    },
  });
  const editProductFrmk = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string("Enter your product name")
        .required("product name is required")
        .min(3, "please enter more then 3 characters ")
        .max(20, "please enter within 20 characters "),
      productPrice: yup
        .number("Enter your product price")
        .positive("enter positive product price")
        .required("product name is required"),

      productDescription: yup
        .string("Enter your product Description")
        .required("product name is required")
        .min(3, "please enter more then 3 characters ")
        .max(500, "please enter within 20 characters "),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log("values: ", values);
      try {
        const res = await axios.put(
          `${baseURI}/product/${editingProduct._id}`,
          {
            name: values.productName,
            price: values.productPrice,
            description: values.productDescription,
          }
        );
        console.log("response: ", res.data);
        setIsEditMode(!isEditMode);
        setToggleRefresh(!toggleRefresh);
      } catch (err) {
        console.log("error: ", err);
        toast(`${err.message}`);
      }
      setLoading(false);
    },
  });
  const deleteProduct = async (id) => {
    setLoading(true);
    console.log("delete product", id);
    try {
      const res = await axios.delete(`${baseURI}/product/${id}`);
      console.log("response: ", res.data);
      setToggleRefresh(!toggleRefresh);
      toast(`${res.data.message}`);
    } catch (err) {
      console.log(err);
      toast(`${err.message}`);
    }finally{
      setLoading(false);
    }
  };

  const editMode = (product) => {
    setIsEditMode(!isEditMode);
    setEditingProduct(product);
    //  console.log(product)
    editProductFrmk.setFieldValue("productName", product.productName);
    editProductFrmk.setFieldValue(
      "productDescription",
      product.productDescription
    );
    editProductFrmk.setFieldValue("productPrice", product.productPrice);
  };
  const handlePicChange = (e) => {
    // to display imager instantly on screen
    const profilePictureInput = document.querySelector("#productImg");
    const url = URL.createObjectURL(profilePictureInput.files[0]);
    // console.log("img url: ", url);
    document.querySelector(
      "#previewProductImg"
    ).innerHTML = `<img width="200px" src="${url}" alt="" id="img"/> `;
    setFieldValue("productImg", e.target.files[0]);
    // console.log(e.target.files);
  };
  const searchFun = async(e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    // console.log(searchTerm.length)
    // console.log("delete product", id);
        try {
      const res = await axios.delete(`${baseURI}/product/${searchTerm}`);
      console.log("response: ", res.data);
      // setToggleRefresh(!toggleRefresh);
      toast(`${res.data.message}`);
    } catch (err) {
      console.log(err);
      toast(`${err.message}`);
    }finally{
      setLoading(false);
    }
   
    // for (let i = 0; i < productData.length; i++) {
    //   for (let j = 0; j < searchTerm.length; j++) {
    //     if(searchTerm[j]===productData[j].productName){
    //       console.log('productData[i]');
    //        }
    //   }
    // }

    // console.log(e.target.value)

    //  console.log(
    // productData.filter((data, i)=>console.log(searchTerm[i],i))//);
    //data.productName===searchTerm[i]))
    //       if(data.productName===searchTerm){
    // console.log("matched");
    //       }
    // aarray.indexOf(3);
    // console.log(productData)
    // return searchResult;
  };
  return (
    <>
      <ToastContainer />
      <div className="bgImg">
        <h1>E-Commerce Store</h1>
        <Button variant="contained" onClick={handleOpenClose}>
          Add Product <AiOutlineArrowRight />
        </Button>
        <input
          type="search"
          placeholder="Search Products..."
          onChange={searchFun}
        />

        {/* <form className="formm" onSubmit={searchFun}>
          <input
            type="text"
            id="city"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products..."
          />
          <button type="submit">Get Weather</button>
        </form> */}

        <Button variant="contained" onClick={setToggleRefresh}>
          Refresh
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

        {loading ? (
          <div className="loadingDiv">
            loading...
            {/* <img src={loadingGif} className="loadingGif" alt="Loading" /> */}
          </div>
        ) : null}
        {/* {err ? <div className="errorr">{err}</div> : ""} */}
      </div>
      {!productData
        ? null
        : productData?.map((eachProduct, index) => (
            <div
              className="productDataDiv"
              key={index}
              style={{
                border: "1px solid black",
                padding: 10,
                margin: 10,
                borderRadius: 15,
              }}
            >
              <h1>product Name: {eachProduct.productName}</h1>
              <h3>{eachProduct.productPrice}</h3>
              <p>{eachProduct.productDescription}</p>
              <img
                src={eachProduct.productImg}
                alt="productImg"
                width="200px"
                height="200px"
              />
              <button onClick={() => deleteProduct(eachProduct._id)}>
                Delete
              </button>
              <button onClick={() => editMode(eachProduct)}>Edit</button>
              {isEditMode && editingProduct._id === eachProduct._id ? (
                <div>
                  <form onSubmit={editProductFrmk.handleSubmit}>
                    <input
                      id="productName"
                      placeholder="Product Name"
                      value={editProductFrmk.values.productName}
                      onChange={editProductFrmk.handleChange}
                    />
                    {editProductFrmk.touched.productName &&
                    Boolean(editProductFrmk.errors.productName) ? (
                      <span style={{ color: "red" }}>
                        {editProductFrmk.errors.productName}
                      </span>
                    ) : null}

                    <br />
                    <input
                      id="productPrice"
                      placeholder="Product Price"
                      value={editProductFrmk.values.productPrice}
                      onChange={editProductFrmk.handleChange}
                    />
                    {editProductFrmk.touched.productPrice &&
                    Boolean(editProductFrmk.errors.productPrice) ? (
                      <span style={{ color: "red" }}>
                        {editProductFrmk.errors.productPrice}
                      </span>
                    ) : null}

                    <br />
                    <input
                      id="productDescription"
                      placeholder="Product Description"
                      value={editProductFrmk.values.productDescription}
                      onChange={editProductFrmk.handleChange}
                    />
                    {editProductFrmk.touched.productDescription &&
                    Boolean(editProductFrmk.errors.productDescription) ? (
                      <span style={{ color: "red" }}>
                        {editProductFrmk.errors.productDescription}
                      </span>
                    ) : null}

                    <br />
                    <button type="submit"> Submit </button>
                  </form>
                </div>
              ) : null}
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
