import { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { toast } from 'react-toastify';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
const CheckOutForm = ({ price, singleSelectClass }) => {
  // console.log('selectClass',price,singleSelectClass);
  const { user } = UseAuth()
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState('')
  const [axiosSecure] = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const [transectionId, setTransectionId] = useState('')
  const selectClass = singleSelectClass
  const { _id, selectClassId, class_name, image } = selectClass || {}
  const navigate = useNavigate()
  // console.log(selectClass,);
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/payment', { price })
        .then(res => {
          // console.log('paymentData', res.data.clientSecret);
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [price, axiosSecure])


  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      setCardError(error.message)
      console.log(error, 'error');
    }
    else {
      setCardError('')
      // console.log('paymentMethod', paymentMethod);
    }
    setProcessing(true)
    // console.log('card', card);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anonymous user',
          email: user?.email || 'unknown'
        }

      }
    })
    if (confirmError) {
      setCardError(confirmError)
    }
    // console.log('paymentIntent', paymentIntent);
    setProcessing(false)
    if (paymentIntent.status === 'succeeded') {
      setTransectionId(paymentIntent.id)
      // save payment information to the server
      const payment = {
        email: user?.email,
        name: user?.displayName,
        transectionId: paymentIntent.id,
        price,
        date: new Date(),
        status: 'service pending',
        selectClassItems:_id,
        selectClassId:selectClassId,
        class_name: class_name,
        image
      }
      axiosSecure.post('/payments', payment)
        .then(res => {
          if (res.data) {
            // console.log(res.data);
            toast('Pay The Payment Successfully !!!', { autoClose: 2000 })
            setTimeout(() => {
              navigate('/dashboard/payment-history')
            }, 3000);
            event.target.reset()
          }
        })
    }

  }
  return (
    <div className='my-60 '>
      <form onSubmit={handleSubmit} className='lg:mx-20 border-2 p-5 rounded-md lg:w-[768px] md:w-[500px] sm:w-[450px] w-[400px] relative mx-auto bg-white text-slate-600 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" className="btn mt-5 px-10 text-3xl bg-info text-white dark:bg-warning dark:hover:bg-info hover:bg-warning font-Pt dark:font-Merienda" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {cardError && <p className='text-2xl text-red-600 text-center mt-10 font-Pt dark:font-Merienda lg:text-left'>{cardError}</p>}
      {transectionId && <p className='text-2xl dark:text-white text-slate-500 text-center mt-10 font-Pt dark:font-Merienda lg:text-left'>Transection Complete with transectionId: <span className='dark:text-warning text-info'>{transectionId}</span></p>}
    </div>
  )
}

export default CheckOutForm