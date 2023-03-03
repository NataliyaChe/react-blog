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
                        </Form>
                    )
                }}
                
            </Formik>
        </div>
    );
}

export default Registration;