// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import {loadStripe} from '@stripe/stripe-js';
// import { Elements} from '../../src';

import { CheckoutForm } from './ChecoutForm';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY);



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Payment = ({user}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm user={user}></CheckoutForm>
    </Elements>
  );
};

Payment.propTypes = {
  user: PropTypes.object.isRequired
}

export default Payment;