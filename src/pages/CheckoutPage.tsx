import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Check, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/common/Dialog';
import { PaymentCompletion, paymentService } from '../services/api/paymentservice';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51OjbUfBbzgz8n85obaL5JQMnOfw0vX3p07cXLpXiHStUGaoGYHsLgxeN01oXwF6ka7m49z0AGDLJyeoAf1knQzn000wcVEBhuC');

interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}

interface LocationState {
  amount: number;
  clientSecret?: string;
  paymentIntentId?: string;
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const {error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/customer/orders',
        },
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
      } else {
        const paymentCompletion: PaymentCompletion = {
            payment_intent_id: paymentIntent.id
          };
        const data = paymentService.completePayment(paymentCompletion)
        console.log(data)
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/customer/orders');
        }, 3000);
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PaymentElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-medium`}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <CreditCard className="w-5 h-5" />
              </motion.div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Pay Securely</span>
            </>
          )}
        </button>
      </form>

      <Dialog open={isSuccess} onClose={() => setIsSuccess(false)}>
        <DialogHeader>
          <DialogTitle>Payment Successful!</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Thank you for your purchase!</h3>
            <p className="text-gray-600 mb-4">
              Your order has been confirmed. You will be redirected to your orders page shortly.
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const state = location.state as LocationState;
    
    if (!state?.clientSecret) {
      toast.error('Missing payment information');
      navigate('/artbyusha/cart');
      return;
    }

    // You could fetch order summary details here
    setOrderSummary({
      subtotal: state?.amount,
      tax: 0,
      total: state?.amount
    });
  }, [location, navigate]);

  const options = {
    clientSecret: (location.state as LocationState)?.clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#22c55e',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-4xl text-green-600 pl-20 font-bold mt-5 pt-10 mb-10 pb-10">Secure Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {(location.state as LocationState)?.clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span>Payment information not found</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {orderSummary && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span> LKR {orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>LKR {orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>LKR {orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;