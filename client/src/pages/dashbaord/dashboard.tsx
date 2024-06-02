import React, { useEffect, useState } from 'react'
import SideBar from '@/components/SideBar'
import { getAllConnetedMail, getAllMailsforSelected, clearErrors } from '@/global/actions/MailActions';
import type { AppDispatch } from '../../store'
import { toast } from 'react-toastify';
import {useDispatch, useSelector } from 'react-redux';
import EmailLists from '@/components/EmailLists';


interface Mail {
  mail?: string;
  type?: string;
  user_id?: string;
  password?: string;
}

interface RootState {
  connectedMails: {
    error?: string;
    connectedMails?: Mail[];
  };
}


interface Email {
  user_id: string;
  email_id: number;
  body: string;
}

interface RootMailDetails {
  getAllMails: {
    allMails?: Email[];
  };
}



const Dashboard = () => {

  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const dispatch = useAppDispatch()

  const {connectedMails, error} = useSelector((state: RootState) => state.connectedMails);
  const {allMails} = useSelector((state: RootMailDetails) => state.getAllMails)

  const [selectedAccount, setSelectedAccount] = useState<Mail[]>([]);
  const [data, setData] = useState<Email[]>(allMails)

  const handleChange = (accountEmail: string) => {
    const selected = connectedMails?.find(account => account.mail === accountEmail);
    if (selected) {
      setSelectedAccount([selected]);
      localStorage.setItem('selectedAccount', JSON.stringify(selected));
    }
  };

  console.log("data123", allMails)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllConnetedMail())
}, [dispatch, error])

  useEffect(() =>{
    setSelectedAccount(connectedMails)
  }, [connectedMails])


  const fetchEmails = () =>{

    const storedAccount = localStorage.getItem('selectedAccount');
      if (storedAccount) {
        const cred = JSON.parse(storedAccount);
        const formData = {
          type: cred?.type,
          email: cred?.mail,
          password: cred?.password
        }

        dispatch(getAllMailsforSelected(formData))
    }
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   fetchEmails();
    // }, 5000);

    // return () => clearInterval(interval);
    // setData(allMails)
  }, [allMails]);
  

  return (
    <div className='w-[98%] h-[98vh] flex flex-row items-start justify-start m-auto mt-2'>

      <div>
        <SideBar selectedAccount={selectedAccount} handleChange={handleChange}/>
      </div>

      <div>
        <EmailLists data={data}/>
      </div>

    </div>
  )
}

export default Dashboard