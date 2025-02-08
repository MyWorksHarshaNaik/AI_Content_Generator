"use client";
import { FileClock, HomeIcon, Settings, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import UsageTrack from './UsageTrack';
import Link from 'next/link';

function SideNav() {
  const router = useRouter();  // Initialize useRouter for navigation
  const path = usePathname();

  const MenuList = [
    { name: 'Home', icon: HomeIcon, path: '/dashboard' },
    { name: 'History', icon: FileClock, path: '/dashboard/history' },
    { name: 'Billing', icon: WalletCards, path: '/dashboard/billing' },
    { name: 'Setting', icon: Settings, path: '/dashboard/setting' },
  ];

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className='h-screen relative p-5 shadow-sm border'>
      {/* Logo Section */}
      <Link href={'/'}>
      <div className='flex justify-center border-b'>
        <Image src={'/logo.svg'} alt='logo' width={100} height={10} />
      </div>
      </Link>

      <hr className='my-6' />

      {/* Menu Section */}
      <div className='mt-3 border'>
        {MenuList.map((menu, index) => (
          <div 
            key={index}
            onClick={() => router.push(menu.path)}  // Navigate on click
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white 
                       rounded-lg cursor-pointer items-center
                       ${path === menu.path ? 'bg-primary text-white' : ''}
                       `}
          >
            <menu.icon className='h-6 w-6' />
            <h2 className='text-lg'>{menu.name}</h2>
          </div>
        ))}
      </div>

      {/* Usage Track at Bottom */}
      <div className='absolute bottom-10 left-0 w-full'>
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
