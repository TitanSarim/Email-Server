import React from 'react'
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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IoAdd } from "react-icons/io5";

interface Account {
  image: React.ComponentType;
  account: string;
}

interface SideBarProps {
  selectedAccount: Account;
  accounts: Account[];
  handleChange: (accountEmail: string) => void;
}


const SideBar: React.FC<SideBarProps> = ({ selectedAccount, accounts, handleChange}) => {


  return (
    <div className='border-solid border-r-[1px] border-gray-300 h-[98vh] w-[280px]'>

        <div className='w-[100%] border-b-[1px] pb-4 border-gray-300'>
          <Select onValueChange={handleChange} defaultValue={selectedAccount.account}>
            <SelectTrigger className="w-[260px]">
              <SelectValue>
                <div className='w-[220px] flex flex-row items-center justify-evenly'>
                  <selectedAccount.image/>
                  <p className='capitalize'>{selectedAccount.account}</p>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent> 
            {accounts.map((account, index) => (
              <SelectItem key={index} value={account.account}>
                <div className='flex flex-row items-center justify-evenly gap-2'>
                  <account.image />
                  <span>{account.account}</span>
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
                <Button className='bg-white w-[260px] h-[50px] px-4 border-solid border-[1px] border-gray-300 rounded-md flex flex-row items-center justify-start gap-4 text-black hover:text-white hover:bg-black'>
                    <IoAdd  size={25}/>
                    <p className='text-[19px] font-montserrat'>Connect New Email</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        </div>

    </div>
  )
}

export default SideBar