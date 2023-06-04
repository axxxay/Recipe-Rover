import {RxCross2} from 'react-icons/rx'

const SideNavBar = () => {
    return(
        <nav className="flex items-center mb-[10px]">
            <RxCross2 className='text-[25px]'/>
            <p className='text-[orange] text-[18px] font-[500] ml-[10px]'>Recipe Rover</p>
        </nav>
    )
}

export default SideNavBar