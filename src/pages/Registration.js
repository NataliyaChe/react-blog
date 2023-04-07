import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useApi} from '../hooks/useApi';

function Registration() {
    const { getUserByEmail, post } = useApi()
    const navigate = useNavigate();

    Yup.addMethod(Yup.string, 'checkEmail', function(message) {
        return this.test('checkEmail', message, async function (value) {
            const user = await getUserByEmail('users', value);
            return !user.length
          });
    })

    Yup.addMethod(Yup.string, 'checkBannedEmail', function(message) {
        return this.test('checkBannedEmail', message, async function (value) {
            const bannedEmail = await getUserByEmail('bannedEmail', value);
            return !bannedEmail.length
          });
    })

    const signInSchema = Yup.object().shape({
        username: Yup.string().matches(/^[a-zA-Z]+$/, 'Invalid Login').required("Login is required"),
        email: Yup.string().email('Invalid Email').checkEmail('Email already exist').checkBannedEmail('This email banned').required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(4, "Password is too short - should be 4 chars min"),
        password_rpt: Yup.string().required("Password is required").oneOf([Yup.ref('password'), ''], 'Check Confirm password')
      });

    const initialValues = {
        username: '',
        email: '',
        password: '',
        password_rpt: '',
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
                    id: Date.now(),
                    securityBreaches: 0,
                    ban: false,
                    banEndDate: null
                }
                post('users', newUser);
                navigate('/login');
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
                                <Link to='/login' className='link login-link'>
                                    Already registered? Sign in
                                </Link>
                            </div>
                        </Form>
                    )
                }}        
            </Formik>
        </div>
    );
}

export default Registration;