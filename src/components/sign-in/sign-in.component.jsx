import React from 'react';
import { EmailSignInStart, GoogleSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.style.scss'

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { EmailSignInStart } = this.props;
        const { email, password } = this.state;
        EmailSignInStart(email, password)
    }
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { GoogleSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" label='email' handleChange={this.handleChange} value={this.state.email} required />
                    <FormInput type="password" name="password" label='password' handleChange={this.handleChange} value={this.state.password} required />
                    <div className='button'>
                        <CustomButton type="submit"> sign in </CustomButton>
                        <CustomButton type='button' onClick={GoogleSignInStart} isGoogleSignIn> sign in with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    GoogleSignInStart: () => dispatch(GoogleSignInStart()),
    EmailSignInStart: (email, password) => dispatch(EmailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);