import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IEXtkG8PENacaQfb7PUuwiPGKkMjEuKP1eb5VZ5kpoTuOSZSAPVLbY5yyj3V5J2rVgz1p5baUHRFpBn5fxrQ85A00XYSxsUJQ'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return(
        <div>
            <StripeCheckout 
                label='Pay Now'
                name='Crwn Clothing pvt.'
                billingAddress
                shippingAddress
                image = 'https://svgshare.com/i/CUz.svg'
                description={`Your Total is: $${price}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                token ={onToken}
                stripeKey={publishableKey}
            />
        </div>
    )
}

export default StripeCheckoutButton;