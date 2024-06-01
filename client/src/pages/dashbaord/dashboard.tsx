import React, { useState } from 'react'
import SideBar from '@/components/SideBar'
import { BiLogoGmail } from "react-icons/bi";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";


interface Account {
  image: React.ComponentType;
  account: string;
}

const accounts: Account[] = [
  {
    "image": BiLogoGmail,
    "account": "sarimxahid123@gmail.com"
  },
  {
    "image": PiMicrosoftOutlookLogo,
    "account": "sarimxahid123@outlook.com"
  }
];


const Dashboard = () => {

  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);

  const handleChange = (accountEmail: string) => {
    const selected = accounts.find(account => account.account === accountEmail);
    if (selected) {
      setSelectedAccount(selected);
    }
  };

  
  return (
    <div className='w-[98%] h-[98vh] flex-row items-start justify-between m-auto mt-2'>

      <div>
        <SideBar selectedAccount={selectedAccount}  accounts={accounts} handleChange={handleChange}/>
      </div>

    </div>
  )
}

export default Dashboard