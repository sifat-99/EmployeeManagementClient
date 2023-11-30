import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/hooks/useAxiosPublic";
import Swal from "sweetalert2";

export const CheckoutForm = ({ user }) => {
  const stripe = useStripe();
  const elements = useElements();
  //   const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const payUser = user.user.user;
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const email = payUser.email;
  const name = payUser.name;

  

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { salary: payUser.salary })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [payUser, axiosPublic]);

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    console.log(payUser.email);

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
            name: name,
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: email,
          price: payUser.salary,
          transactionId: paymentIntent.id,
          date: new Date(), 
          status: "paid",
          image: payUser.image,
        };

        console.log(payment)

        const res = await axiosPublic.post('/payments', payment);
        console.log('payment saved', res.data);
        if (res.data?.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for the taka paisa",
                showConfirmButton: false,
                timer: 1500
            });
        }
      }
    }
  };
  return (
    <div>
      <h2>To pay: ${payUser.salary * 100}</h2>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                padding: "10px 12px",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "20px", padding: "8px 16px" }}
          color="primary"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {transactionId && (
          <p style={{ color: "green" }}>
            Payment Successful. Your Transaction Id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  user: PropTypes.object,
};
