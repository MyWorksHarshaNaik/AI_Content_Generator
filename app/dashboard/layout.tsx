"use client";
import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [totalUsage, setTotalUsage] = useState<number>(0);
    const [userSubscription, setUserSubscription] = useState<boolean>(false);
    const [updateCreditUsage, setupdateCreditUsage] = useState<any>();

    return (
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
            <UserSubscriptionContext.Provider value={{userSubscription, setUserSubscription}}>
                <UpdateCreditUsageContext.Provider value={{updateCreditUsage, setupdateCreditUsage}}>
                    <div className='bg-slate-200 h-screen'>
                        <div className='md:w-64 hidden md:block fixed'>
                            <SideNav />
                        </div>
                        <div className='md:ml-64'>
                            <Header />
                            {children}
                        </div>
                    </div>
                </UpdateCreditUsageContext.Provider>
            </UserSubscriptionContext.Provider>
        </TotalUsageContext.Provider>
    );
}

export default Layout;
