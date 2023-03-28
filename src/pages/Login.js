import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../hooks/useApi';
import Warning from '../components/Warning';
import { getBanTimeLeft } from '../utils/BanDateHelper'

function Login() {
    const [matchUser, setMatchUser] = useState({});
    const navigate = useNavigate();
    const { login, user } = useAuth();
    const { getUserByEmail } = useApi();
    const [isWarningShown, setIsWarningShown] = useState(false);
    const [banTime, setBanTime] = useState(null);

    Yup.addMethod(Yup.string, 'checkEmail', function(message) {
        return this.test('checkEmail', message, async function (value) {
            const user = await getUserByEmail('users', value);
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

    function getNotification() {
        // login(matchUser);
        const banTimeLeft = getBanTimeLeft(matchUser.banEndDate);
        if(banTimeLeft > 0) {
            setIsWarningShown(true);
            setBanTime(banTimeLeft);
        } else {
            navigate('/');
        }
    }

    function getLogin() {
        // login(matchUser);
        navigate('/');
    }

    console.log('matchUser', matchUser);
    return (
    <div className='container'>
        {isWarningShown &&
            <Warning setIsWarningShown={setIsWarningShown}
            banTime={banTime}
            /> 
        }
        <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={() => {
            login(matchUser);
            matchUser.securityBreaches === 2 ? getNotification() : getLogin()
            // login(matchUser);
            // navigate('/');
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