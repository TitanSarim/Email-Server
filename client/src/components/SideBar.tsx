import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HiOutlineInbox } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IoAdd } from "react-icons/io5";
import { PiPlugsConnectedLight } from "react-icons/pi";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { BiLogoGmail } from "react-icons/bi";


interface Account {
  mail?: string;
  type?: string;
  user_id?: string;
}

interface SideBarProps {
  selectedAccount: Account[];
  handleChange: (accountEmail: string) => void;
}



const SideBar: React.FC<SideBarProps> = ({ selectedAccount, handleChange}) => {


   const [mail, setMail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [type, setType] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)

  const handleCheckboxChange = (selectedType: string) => {
    setType(prevType => (prevType === selectedType ? '' : selectedType));
  };

  const handleSubmit = async (event: React.ChangeEvent<unknown>) => {
    event.preventDefault();
    const formData = {
      type,
      email: mail,
      password
    }
    setLoading(true)
    try {
      const token = Cookies.get('token');
  
      const config = { headers: 
                        { 
                          "Content-Type": "application/json",
                           Authorization: `Bearer ${token}` 
                        }
                      }
      const res = await axios.post("http://localhost:4000/api/v1/connect-email", formData, config)

      if(res.status === 200){
        toast.success("Mail connected successfully")
      }

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='border-solid border-r-[1px] border-gray-300 h-[98vh] w-[280px]'>

        <div className='w-[100%] border-b-[1px] pb-4 border-gray-300'>
          <Select onValueChange={handleChange} >
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select account"/>
            </SelectTrigger>
            <SelectContent> 
            {selectedAccount?.map((account, index) => (
              <SelectItem key={index} value={account.mail}>
                <div className='flex flex-row items-center justify-evenly gap-2'>
                  {account.type === "outlook" ? <PiMicrosoftOutlookLogo/> : <BiLogoGmail/>}
                  <span>{account.mail}</span>
                </div>
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
        </div>

        <div className='w-[100%] mt-7'>
            <div className='bg-black w-[260px] h-[50px] px-4 rounded-md flex flex-row items-center justify-start gap-4'>
              <HiOutlineInbox className='text-white' size={24}/>
              <p className='text-white text-[19px] font-montserrat'>Inbox</p>
            </div>
        </div>

        <div className='w-[100%] mt-7'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-white w-[260px] h-[50px] px-4 rounded-md flex flex-row items-center justify-start gap-4 text-gray-700 hover:bg-gray-200'>
                    <IoAdd  size={25}/>
                    <p className='text-[19px] font-montserrat'>New</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Send new mail</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        </div>

        <div className='w-[100%] mt-7'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-white w-[260px] h-[50px] px-4 rounded-md flex flex-row items-center justify-start gap-4 text-gray-700 hover:bg-gray-200'>
                    <PiPlugsConnectedLight  size={25}/>
                    <p className='text-[19px] font-montserrat'>Connect New Email</p>
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">

              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Connect new mail</DialogTitle>
                  <DialogDescription>
                    Connect another mail e.g Outlook, Gmail
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className='w-[300px] flex flex-row items-start justify-start gap-10'>
                    <div className='flex flex-row gap-2'>
                      <Checkbox 
                        id='checkbox_outlook' 
                        checked={type === 'outlook'} 
                        onCheckedChange={() => handleCheckboxChange('outlook')} 
                      />
                      <Label htmlFor='checkbox_outlook'>
                        Outlook
                      </Label>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <Checkbox 
                        id='checkbox_gmail' 
                        checked={type === 'gmail'} 
                        onCheckedChange={() => handleCheckboxChange('gmail')} 
                      />
                      <Label htmlFor='checkbox_gmail'>
                        Gmail
                      </Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mail" className="text-right">
                      Mail
                    </Label>
                    <Input
                      id="mail"
                      placeholder='example@example.com'
                      className="col-span-3"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      placeholder="Password"
                      className="col-span-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">{loading === true ? "Loading" : "Connect"}</Button>
                </DialogFooter>
                </form>

              </DialogContent>


            </Dialog>
        </div>

    </div>
  )
}

export default SideBar