"use client"
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react'
import axios from 'axios'
import Razorpay from 'razorpay'
import { error } from 'console';
import { Loader, Loader2Icon } from 'lucide-react';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';

function billing() {

  const [loading, setLoading]=useState(false);
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
  const {user}=useUser();

  const CreateSubscription=()=>{
    setLoading(true)
    axios.post('/api/create-subscription', {})
    .then(resp => {
      console.log(resp.data);
      OnPayment(resp.data.id)
    }, (error)=>{
      setLoading(false);
    })
  }

  const OnPayment=(subId:string)=>{
    const options={
      'key':process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      'subscription_id':subId,
      'name':'Harsha AI Apps',
      description:'Monthly subscription',
      handler:async(resp:any)=>{
        console.log(resp);
        if(resp){
          SaveSubscription(resp.razorpay_payment_id)
        }
        setLoading(false);
      }
    }
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const SaveSubscription=async(paymentId:string)=>{
    const result = await db.insert(UserSubscription)
    .values({
      email:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      active:true,
      paymentId:paymentId,
      joinDate:moment().format('DD/MM/yyyy')
    });
    console.log(result);
    if(result){
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <h1 className="text-3xl font-bold mb-8">Upgrade With Monthly Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:items-center">
        {/* Free Plan */}
        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg border border-gray-300">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Free</h2>
            <p className="text-4xl font-extrabold mb-1">0<span className="text-lg font-medium">$</span></p>
            <p className="text-sm text-gray-600 mb-4">/month</p>
            <ul className="text-gray-700 mb-6 space-y-2">
              <li>✓ 10,000 Words/Month</li>
              <li>✓ 50+ Content Templates</li>
              <li>✓ Unlimited Download & Copy</li>
              <li>✓ 1 Month of History</li>
            </ul>
            <Button className="w-full bg-gray-800 text-white">Currently Active Plan</Button>
          </div>
        </div>

        {/* Monthly Subscription Plan */}
        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg border border-gray-300">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Monthly</h2>
            <p className="text-4xl font-extrabold mb-1">
              <span className="text-blue-600">9.99</span>
              <span className="text-lg font-medium">$</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">/month</p>
            <ul className="text-gray-700 mb-6 space-y-2">
              <li>✓ 1,00,000 Words/Month</li>
              <li>✓ 50+ Template Access</li>
              <li>✓ Unlimited Download & Copy</li>
              <li>✓ 1 Year of History</li>
            </ul>
            <Button 
              disabled={loading}
              onClick={()=>CreateSubscription()}
              className="flex gap-2 items-center w-full border-2 border-purple-600 text-black hover:bg-purple-100">
              {loading&&<Loader2Icon className='animate-spin'/>}  
              {userSubscription?'Active Plan': 'Get Started'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default billing