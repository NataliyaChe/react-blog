import React, { useState, useEffect } from 'react';
import Api from '../utils/Api'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Registration() {
    const [users, setUsers] = useState([]);
    const api = new Api('http://localhost:3004/users');
    
    useEffect(() => {
        const fetchUsers = async () => {
          const users = await api.get()
          setUsers(users)
        }
        fetchUsers()
    }, []);

    
    // Yup.addMethod(Yup.string, "isValidEmail", isValidEmail);

    const signInSchema = Yup.object().shape({
        username: Yup.string().matches(/^[a-zA-Z]+$/, 'Invalid Login').required("Login is required"),
        email: Yup.string().email('Invalid Email').required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(4, "Password is too short - should be 4 chars min"),
        password_rpt: Yup.string().required("Password is required").oneOf([Yup.ref('password'), ''], 'Check Confirm password')
      });

    const initialValues = {
        username: '',
        email: '',
        password: '',
        password_rpt: ''
      };

    //   .notOneOf([users.find(user => user.email === Yup.ref('email'))], 'Check Confirm password')
    
    //   const [users, setUsers] = useState([]);
    //     const api = new Api('http://localhost:3004/users');
        
    //     useEffect(() => {
    //         const fetchUsers = async () => {
    //           const users = await api.get()
    //           setUsers(users)
    //         }
    //         fetchUsers()
    //     }, []);
      
    //   const validate = (values) => {
    //     let errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      
    //     if (!values.name) {
    //       errors.name = "Login is required";
    //     } else if (!/^[a-zA-Z]+$/.test(values.name)) {
    //       errors.name = "Invalid Login";
    //     }
    
    //     if (!values.email) {
    //         errors.email = "Email is required";
    //       } else if (!regex.test(values.email)) {
    //         errors.email = "Invalid Email";
    //       } else if (users.find(user => user.email === values.email)) {
    //                 errors.email = 'Email already registered!'
    //             }
      
    //     if (!values.password) {
    //       errors.password = "Password is required";
    //     } else if (values.password.length < 4) {
    //       errors.password = "Password too short";
    //     } else if (values.password !== values.password_rpt) {
    //         errors.password = 'Confirm password!'
    //     }
      
    //     return errors;
    //   };
      
    //   const submitForm = (values) => {
    //     console.log(values);
    //     delete values.password_rpt;
    //         values.id = Date.now()
    //         console.log('newUser', values);
    //         api.post(values)
    //         setUsers(
    //             [...users, values]
    //         ) 
    //   };
    
    console.log('users', users);

    return (
        <div className='container'>
            <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values) => {
                console.log(values);
              }}>
                {(formik) => {
                    const {
                        // values,
                        // handleChange,
                        // handleSubmit,
                        errors,
                        touched,
                        // handleBlur,
                        isValid,
                        dirty
                    } = formik;
                    return (
                        <Form className='form'>
                            <h1 className='title'>Register</h1>
                            <label className='name_lbl label' htmlFor='username'>
                                Login
                            </label>
                            <Field 
                                type='text' 
                                placeholder='Your Name' 
                                name='username'
                                id='username'
                                // value={values.name}
                                // onChange={handleChange}
                                // onBlur={handleBlur} 
                                className={`
                                    name inp
                                    ${errors.username && touched.username ? "input-error" : null}`
                                  }
                                />
                                {/* {errors.name && touched.name && (
                                    <span className="error">{errors.name}</span>
                                )} */}
                                <ErrorMessage name='username' component='span' className="error" />
                            <label className='email_lbl label' htmlFor='email'>
                                Email
                            </label>
                            <Field 
                                type='email' 
                                id='email'
                                placeholder='Your Email' 
                                name='email'
                                // value={values.email}
                                // onChange={handleChange}
                                // onBlur={handleBlur} 
                                className={`
                                    email inp
                                    ${errors.email && touched.email ? "input-error" : null}`
                                  }
                                />
                                {/* {errors.email && touched.email && (
                                    <span className="error">{errors.email}</span>
                                )} */}
                                <ErrorMessage name='email' component='span' className="error" />
                            <label className='label' htmlFor='password'>
                                Password
                            </label>
                            <Field 
                                type='password' 
                                placeholder='Password' 
                                name='password' 
                                id='password'
                                // value={values.password}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                className={`
                                password inp
                                ${errors.password && touched.password ? "input-error" : null}`
                              }
                                />
                                {/* {errors.password && touched.password && (
                                    <span className="error">{errors.password}</span>
                                )} */}
                                <ErrorMessage name='password' component='span' className="error" />
                            <label className='password_lbl label' htmlFor='password_rpt'>Confirm Password</label>
                            <Field className='password_rpt inp' 
                                type='password' 
                                placeholder='Repeat Password' 
                                name='password_rpt' 
                                id='password_rpt'
                                // value={values.password_rpt}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                                <ErrorMessage name='password_rpt' component='span' className="error" />
                            <button type='submit'
                                className={`submit_btn button ${!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled=${!(dirty && isValid)}`}
                            >
                                Register
                            </button>
                        </Form>
                    )
                }}
                
            </Formik>
        </div>
    );
}

export default Registration;