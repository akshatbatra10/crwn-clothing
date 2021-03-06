import React, { useState } from 'react';
import { EmailSignInStart, GoogleSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.style.scss'

const SignIn = ({ EmailSignInStart, GoogleSignInStart }) => {

    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        EmailSignInStart(email, password)
    }
    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type="email" name="email" label='email' handleChange={handleChange} value={email} required />
                <FormInput type="password" name="password" label='password' handleChange={handleChange} value={password} required />
                <div className='button'>
                    <CustomButton type="submit"> sign in </CustomButton>
                    <CustomButton type='button' onClick={GoogleSignInStart} isGoogleSignIn> sign in with Google </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    GoogleSignInStart: () => dispatch(GoogleSignInStart()),
    EmailSignInStart: (email, password) => dispatch(EmailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);