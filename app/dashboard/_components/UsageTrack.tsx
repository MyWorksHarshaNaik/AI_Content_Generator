"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import Link from 'next/link';

function UsageTrack() {
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext); 
    const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
    const [maxWords, setMaxWords]=useState(10000);
    const {updateCreditUsage, setupdateCreditUsage} = useContext(UpdateCreditUsageContext);

    useEffect(() => {
        if (user) {
            console.log("User detected:", user);
            GetData();
        }
        user&&IsUserSubscribe();
    }, [user]);

    useEffect(()=>{
        user&&GetData();
    },[updateCreditUsage&&user]);

    const GetData = async () => {
        try {
            {/* @ts-ignore */}
            const result: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
            
            console.log("Fetched result:", result);
            GetTotalUsage(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const IsUserSubscribe=async()=>{
        {/* @ts-ignore */}
        const result = await db.select().from(UserSubscription).where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

        if(result)
        {
            setUserSubscription(true);
            setMaxWords(100000);
        }
    }

    const GetTotalUsage = (result: HISTORY[]) => {
        let total = 0;
        result.forEach(element => {
            total += Number(element.aiResponse?.length || 0);
        });

        console.log("Total usage calculated:", total);
        setTotalUsage(total);  // Update the context state
    };

    // Check if totalUsage is updating correctly
    useEffect(() => {
        console.log("Re-rendering component with totalUsage:", totalUsage);
    }, [totalUsage]);

    return (
        <div className='m-5'>
            <div className='bg-primary text-white p-3 rounded-lg'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                    <div 
                        className='h-2 bg-white rounded-full'
                        style={{ width: `${(totalUsage / maxWords) * 100}%` }}
                    ></div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage}/{maxWords}Credit used</h2>
            </div>
            <Link href={'/dashboard/billing'}>
            <Button variant='secondary' className='w-full my-3 text-primary'>Upgrade</Button>
            </Link>
        </div>
    );
}

export default UsageTrack;
