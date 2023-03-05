import React, { useState, useEffect } from 'react';
import Api from '../utils/Api';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
    const api = new Api('http://localhost:3004/users');
    const [matchUser, setMatchUser] = useState({})
    
    Yup.addMethod(Yup.string, 'checkEmail', function(message) {
        return this.test('checkEmail', message, async function (value) {
            const user = await api.getUserByEmail(value)
            console.log('user[0]', user[0]);
            setMatchUser(user[0])
            return user.length
          });
    })

    Yup.addMethod(Yup.string, 'checkPassword', function(message) {
        return this.test('checkPassword', message, async function (value) {
            return matchUser.password === value
          });
    })

    const signInSchema = Yup.object().shape({
        email: Yup.string().email('Invalid Email').checkEmail('Email not found').required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(4, "Password is too short - should be 4 chars min")
          .checkPassword('Wrong password'),
    });

    const initialValues = {
        email: '',
        password: ''
    };

    return (
    <div className='container'>
            <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={() => {
                localStorage.setItem('matchUser', JSON.stringify(matchUser));
                window.location.href = './'; 
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
                            <h1 className='title'>Login</h1>
                            <label className='email_lbl label' htmlFor='email'>
                                Email
                            </label>
                            <Field 
                                type='email' 
                                id='email'
                                placeholder='Your Email' 
                                name='email'
                                className={`email inp ${errors.email && touched.email ? "input-error" : null}`}
                            />
                            <ErrorMessage name='email' component='span'     className="error" />
                            <label className='label' htmlFor='password'>
                                Password
                            </label>
                            <Field 
                                type='password' 
                                placeholder='Password' 
                                name='password' 
                                id='password'
                                className={`password inp ${errors.password && touched.password ? "input-error" : null}`}
                            />
                            <ErrorMessage name='password' component='span'  className="error" />
                            <button type='submit'
                                className={`submit_btn button ${!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled=${!(dirty && isValid)}`}
                            >
                                Sign in
                            </button> 
                        </Form>
                    );
                }}   
            </Formik>
        </div>
    );
}

export default Login;