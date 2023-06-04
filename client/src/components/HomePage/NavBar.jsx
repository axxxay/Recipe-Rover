import {FiMenu} from 'react-icons/fi'
import {RxCross2} from 'react-icons/rx'
import { useState } from 'react'

const NavBar = () => {

    const [menu, setMenu] = useState(true);
    const [openLoginSignup, setOpenLoginSignup] = useState(false);
    const toggleMenu = () => {
        setMenu(!menu)
    }

    const onClickLoginSignup = () => {
        openLoginSignup(true)
    }

    return(
        <nav className="h-[70px] bg-[#ffffff] flex items-center justify-between md:px-[100px] px-[25px] fixed w-[100%] nav-bar">
            <h1 className="text-[orange] font-[800] text-[20px]">Recipe Rover</h1>
            <div className="hidden md:block">
                <ul className="list-none pl-[0px] flex items-center">
                    <li className="mr-[20px]">Home</li>
                    <li className="mr-[20px]">About us</li>
                    <li className="mr-[20px]">SignIn/SingUp</li>
                </ul>
            </div>
            <div onClick={toggleMenu}>
                {menu ? <FiMenu className='md:hidden text-[25px]'/> :
                <RxCross2 className='md:hidden text-[28px]' />}
            </div>
        </nav>
    )
}

export default NavBar