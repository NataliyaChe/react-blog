import React, { useState, useEffect } from 'react';
import Api from '../utils/Api'
import { Formik } from "formik";

function Registration() {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        password_rpt: ''
      };
    
      const [users, setUsers] = useState([]);
        const api = new Api('http://localhost:3004/users');
        
        useEffect(() => {
            const fetchUsers = async () => {
              const users = await api.get()
              setUsers(users)
            }
            fetchUsers()
        }, []);
      
      const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      
        if (!values.name) {
          errors.name = "Login is required";
        } else if (!/^[a-zA-Z]+$/.test(values.name)) {
          errors.name = "Invalid Login";
        }
    
        if (!values.email) {
            errors.email = "Email is required";
          } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email";
          } else if (users.find(user => user.email === values.email)) {
                    errors.email = 'Email already registered!'
                }
      
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password too short";
        } else if (values.password !== values.password_rpt) {
            errors.password = 'Confirm password!'
        }
      
        return errors;
      };
      
      const submitForm = (values) => {
        console.log(values);
        delete values.password_rpt;
            values.id = Date.now()
            console.log('newUser', values);
            api.post(values)
            setUsers(
                [...users, values]
            ) 
      };
    
    console.log('users', users);

    return (
        <div className='container'>
            <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}>
                {(formik) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty
                    } = formik;
                    return (
                        <form className='form' onSubmit={handleSubmit}>
                            <h1 className='title'>Register</h1>
                            <label className='name_lbl label' htmlFor='name'>
                                Login
                            </label>
                            <input 
                                type='text' 
                                placeholder='Your Name' 
                                name='name'
                                id='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                className={`
                                    name inp
                                    ${errors.name && touched.name ? "input-error" : null}`
                                  }
                                />
                                {errors.name && touched.name && (
                                    <span className="error">{errors.name}</span>
                                )}
                            <label className='email_lbl label' htmlFor='email'>
                                Email
                            </label>
                            <input 
                                type='email' 
                                id='email'
                                placeholder='Your Email' 
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                className={`
                                    email inp
                                    ${errors.email && touched.email ? "input-error" : null}`
                                  }
                                />
                                {errors.email && touched.email && (
                                    <span className="error">{errors.email}</span>
                                )}
                            {/* <span className='error-email error-text'>
                                {isError.email}
                            </span> */}
                            <label className='label' htmlFor='password'>
                                Password
                            </label>
                            <input 
                                type='password' 
                                placeholder='Password' 
                                name='password' 
                                id='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`
                                password inp
                                ${errors.password && touched.password ? "input-error" : null}`
                              }
                                />
                                {errors.password && touched.password && (
                                    <span className="error">{errors.password}</span>
                                )}
                            <label className='password_lbl label' htmlFor='password_rpt'>Confirm Password</label>
                            <input className='password_rpt inp' 
                                type='password' 
                                placeholder='Repeat Password' 
                                name='password_rpt' 
                                id='password_rpt'
                                value={values.password_rpt}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                            <button type='submit'
                                className={`submit_btn button ${!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled=${!(dirty && isValid)}`}
                            >
                                Register
                            </button>
                        </form>
                    )
                }}
                
            </Formik>
        </div>
    );
}

export default Registration;