import React, { useState, useEffect } from 'react';
import Api from '../utils/Api'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Registration() {
    const api = new Api('users');

    Yup.addMethod(Yup.string, 'checkEmail', function(message) {
        return this.test('checkEmail', message, async function (value) {
            const user = await api.getUserByEmail(value)
            return !user.length
          });
    })

    const signInSchema = Yup.object().shape({
        username: Yup.string().matches(/^[a-zA-Z]+$/, 'Invalid Login').required("Login is required"),
        email: Yup.string().email('Invalid Email').checkEmail('Email already exist').required("Email is required"),
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

    return (
        <div className='container'>
            <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values) => {
                const newUser = {
                    login: values.username,
                    email: values.email,
                    password: values.password,
                    id: Date.now()
                }
                api.post(newUser)
                window.location.href = './login'; 
              }}>
                {(formik) => {
                    const {
                        errors,
                        touched,
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
                                className={`
                                    name inp
                                    ${errors.username && touched.username ? "input-error" : null}`
                                  }
                                />
                                <ErrorMessage name='username' component='span' className="error" />
                            <label className='email_lbl label' htmlFor='email'>
                                Email
                            </label>
                            <Field 
                                type='email' 
                                id='email'
                                placeholder='Your Email' 
                                name='email'
                                className={`
                                    email inp
                                    ${errors.email && touched.email ? "input-error" : null}`
                                  }
                                />
                                <ErrorMessage name='email' component='span' className="error" />
                            <label className='label' htmlFor='password'>
                                Password
                            </label>
                            <Field 
                                type='password' 
                                placeholder='Password' 
                                name='password' 
                                id='password'
                                className={`
                                password inp
                                ${errors.password && touched.password ? "input-error" : null}`
                              }
                                />
                                <ErrorMessage name='password' component='span' className="error" />
                            <label className='password_lbl label' htmlFor='password_rpt'>Confirm Password</label>
                            <Field className='password_rpt inp' 
                                type='password' 
                                placeholder='Repeat Password' 
                                name='password_rpt' 
                                id='password_rpt'
                                />
                                <ErrorMessage name='password_rpt' component='span' className="error" />
                            <button type='submit'
                                className={`submit_btn button ${!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled=${!(dirty && isValid)}`}
                            >
                                Register
                            </button>
                            <div className="container signin">
                                <p >
                                    <a className="link login-link" href="./login">Already registered? Sign in</a>
                                </p>
                            </div>
                        </Form>
                    )
                }}        
            </Formik>
        </div>
    );
}

export default Registration;