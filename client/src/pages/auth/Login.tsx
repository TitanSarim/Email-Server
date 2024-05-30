import React from 'react'
import {Link} from 'react-router-dom'
import { Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input'

const Login = () => {
  return (
    <div className="flex min-h-screen font-montserrat">
      <div className="flex-1 bg-black text-white p-10 flex flex-col justify-between">
        <div className="text-xl font-bold">Email Server</div>
        <div className="text-lg">
          <p>
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </p>
          <p className="mt-4">- Sarim</p>
        </div>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className='w-[100%] mb-6 flex-col items-center justify-center'>
            <h2 className="text-gray-700 text-2xl text-center font-bold">Login to your account</h2>
            <p className='text-gray-400 text-[15px] text-center'>Fill your details below to create your account</p>
          </div>
          <form>
            <Input
              type="text"
              placeholder="username or email"
              className="w-full mb-4"
            />
            <Input
              type="password"
              placeholder="password"
              className="w-full mb-4"
            />
            <Button className="w-full mb-4">Sign In</Button>
            <p className='text-center font-semibold font-montserrat text-gray-600'>Or</p>
            <Link to="/register" className='w-full flex items-center justify-center bg-slate-900 text-white text-center rounded-md py-2 mt-2 font-montserrat text-[15px] hover:bg-slate-800'>Join</Link>
          </form>
          <p className="text-sm text-center mt-6 text-gray-400">
            By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login