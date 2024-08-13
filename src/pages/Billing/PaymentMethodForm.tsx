import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/stripe-style.css';

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#f00',
    },
  },
};

interface PaymentMethodFormProps {
  clientSecret: string;
  closeModal: () => void;
  reFetchData: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  clientSecret,
  closeModal,
  reFetchData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
      setLoading(true);
    }

    try {
      const { error: stripeErr } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card,
        },
      });

      if (stripeErr) {
        setError(stripeErr);
      } else {
        toast.success('Payment method saved successfully');
        card.clear();
        closeModal();
        reFetchData();
      }
    } catch (err) {
      setError('Failed to save payment method');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form className="Form" onSubmit={handleSubmit}>
          {/* <ToastContainer /> */}
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <fieldset className="FormGroup">
                  <CardElement
                    options={CARD_OPTIONS}
                    onChange={(e) => {
                      setError(e.error);
                      setCardComplete(e.complete);
                    }}
                  />
                </fieldset>
                {error && (
                  <div className="text-red-500 mb-4">{error.message}</div>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray text-white hover:bg-opacity-90"
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
