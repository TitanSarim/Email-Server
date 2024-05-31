import { useSelector } from 'react-redux'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


interface UserState {
    isAuthenticated: boolean;
  }
  
interface RootState {
    user: UserState;
}


export const ProtectedRoutes = () => {

    const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
    const naviagte = useNavigate();

    const token = Cookies.get('token')

    useEffect(() => {
        const token = Cookies.get('token')
        if(token) {
            naviagte("/dashboard");
        }else{
            naviagte("/")
        }
    }, [naviagte])

    if (!isAuthenticated || !token) {
      toast.error('Session Expired Please Login again');
      return <Navigate to="/" />;
    }

  
  return <Outlet />;
  }
  