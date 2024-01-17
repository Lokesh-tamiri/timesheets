import React from 'react'
import { useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const Navbar = ({ children }) => {
    const user = useSelector(state => state.authReducer.user)
    return (
        <>
            <ul className='flex justify-between py-5 max-w-7xl mx-auto px-12 shadow-lg'>
                <li className='text-xl font-semibold'>Sempione</li>
                <div className='flex gap-5 items-center'>
                    <li className='flex items-center gap-2'>< AccountBalanceWalletIcon/>
                    <p>{user?.balance}</p>
                    </li>
                    <li>
                        <PersonIcon />
                    </li>
                </div>
            </ul>
            {children}
        </>
    )
}

export default Navbar
