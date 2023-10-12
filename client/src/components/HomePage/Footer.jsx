import { Link } from "react-router-dom"
import {AiOutlineCopyright} from 'react-icons/ai'
import {HiOutlineMail} from 'react-icons/hi'
import {IoMdCall} from 'react-icons/io'

const Footer = () => {

    return(
        <footer className="bg-[#f9e9ad40] w-[100%] px-[25px] md:px-[90px] py-[25px] md:py-[50px] xl:px-[180px]">
            <div className="flex items-center">
                <img src="/reciperover-logo.png" className="w-[50px]" alt="footer-logo" />
                <h1 className={`text-[#e26310] font-[800] md:text-[18px] text-[14px] ml-2`}>Recipe Rover</h1>
            </div>

            <div className="flex pt-8 md:justify-between md:flex-row flex-col ">
                <div className="pl-5 md:w-[30%] w-[100%] ">
                    <h1 className="font-bold text-[15px] mb-2 md:mb-3 ">Explore</h1>
                    <div className="md:mt-4 mt-3">
                        <Link to="/">
                            <p className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto'] mb-2 md:mb-3">Home</p>
                        </Link>
                        <Link to="/about">
                            <p className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto'] mb-2 md:mb-3">About</p>
                        </Link>
                    </div>
                </div>

                <div className="pl-5  md:w-[30%] w-[100%] ">
                    <h1 className="font-bold text-[15px] mb-2 md:mb-3 ">Search</h1>
                    <div className="md:mt-4 mt-3">
                        <Link to="/search-by-name">
                            <p className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto'] mb-2 md:mb-3">Search by Name</p>
                        </Link>
                        <Link to="/search-by-ingredients">
                            <p className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto'] mb-2 md:mb-3">Search by Ingredients</p>
                        </Link>
                        <Link to="/search-by-nutrition">
                            <p className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto'] mb-2 md:mb-3">Search by Nutrition</p>
                        </Link>
                        <Link to="/search-by-cuisine">
                            <p className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto'] mb-2 md:mb-3">Search by Cuisine</p>
                        </Link>
                    </div>
                </div>

                <div className="pl-5  md:w-[30%] w-[100%] ">
                    <h1 className="font-bold text-[15px] mb-2 md:mb-3 ">Contact</h1>
                    <div className="md:mt-4 mt-3">
                        <div className="flex items-center mb-2 md:mb-3">
                            <IoMdCall className="text-[#606060] text-[18px] md:text-[22px] mr-2" />
                            <a href="tel:+91987654321" className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto']">+91 9876543210</a>
                        </div>
                        <div className="flex items-center mb-2 md:mb-3">
                            <HiOutlineMail className="text-[#606060] text-[18px] md:text-[22px] mr-2" />
                            <a href="mailto:reciperover@gmail.com" className="text-[#606060] text-[14px] md:text-[16px] font-['Roboto']">reciperover@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-4 md:mt-7">
                <AiOutlineCopyright className="text-[#606060] text-[16px] mr-2" />
                <p className="text-[#606060] text-[13px] font-['Roboto'] ">2023 Recipe Rover</p>
            </div>
        </footer>
    )
}

export default Footer