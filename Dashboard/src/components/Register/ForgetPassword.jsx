import React, { useState } from "react";
import commonStyles from "../shared/commonStyles.js";
import "./Register.css";
import { useFormik } from "formik";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { forgetPasswordSchema } from "./validation.js";
import Welcome from "./Welcome.jsx";
import { TbArrowBigLeftLineFilled } from "react-icons/tb";

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    code: "",
  };

  const onSubmit = async (user) => {
    console.log(user);
    try {
      setLoading(true);
      console.log(user);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL2}/auth/forgetPassword`,
        user
      );
      console.log(data);
      if (data.message == "success") {
        toast.success("your password rest successfully");
        navigate("/login");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('something went wrong, try again later');
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: forgetPasswordSchema,
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Grid-Auth">
          <Welcome />

          <div className="form-wrapper">
					<div className='arrow-button-register'>
                    <Link to={'/forgotPassword'} className='arrow'>
                        <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
                    </Link>
                </div>
            <form
              onSubmit={formik.handleSubmit}
              style={styles.container}
              className=" align-items-center justify-content-center"
            >
            <div className="text-center">
              <h2 className="Form-header">Reset Password</h2>
            </div>
              <div className="form-group">
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  placeholder="email"
                  style={styles.input}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  placeholder="password"
                  style={styles.input}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  {...formik.getFieldProps("code")}
                  placeholder="Code"
                  style={styles.input}
                />
                {formik.errors.code && formik.touched.code && (
                  <p className="text-danger">{formik.errors.code}</p>
                )}
              </div>
              <button type="submit" className="button">
                Send Code
              </button>
            </form>
          </div>
        </div>
      )}{" "}
    </>
  );
}
const styles = {
  ...commonStyles,
  textarea: {
    height: 120,
    resize: "vertical",
    paddingTop: "10px",
    borderRadius: 10,
  },
};

export default ForgetPassword;
