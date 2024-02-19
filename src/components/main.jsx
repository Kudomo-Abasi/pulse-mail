import { Button } from '@mui/material';
import React from 'react'

export default function Main() {
    const handleLogout =()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }

  return (
    <Button onClick={handleLogout} >Logout</Button>
    )
}
