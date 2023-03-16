import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import Api from '../utils/Api';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import {useAuth} from '../utils/AuthContext';
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../hooks/useApi';

function Login() {
    // const api = new Api('users');
    const [matchUser, setMatchUser] = useState({});
    const navigate = useNavigate();

    const { login } = useAuth();

    const { getUserByEmail } = useApi('users');

    Yup.addMethod(Yup.string, 'checkEmail', function(message) {
        return this.test('checkEmail', message, async function (value) {
            // const user = await api.getUserByEmail(value);
            const user = await getUserByEmail(value);
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
                login(matchUser);
                navigate('/');
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
                            <div className="container signin">
                                <Link to='/registration' className='link login-link'>
                                    New member?
                                </Link>
                            </div>
                        </Form>
                    );
                }}   
            </Formik>
        </div>
    );
}

export default Login;