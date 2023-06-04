

const SearchByCuisine = () => {
    return(
        <div className="flex w-[100%] flex-col md:flex-row justify-between items-center mb-[30px]">
            <img src="/hands-holding-bowl-food-top-view.jpg" alt="" className="md:w-[300px] w-[150px] lg:w-[370px] mb-[20px] md:mb-[0px] " />
            <div className="md:w-[60%] text-center md:text-left">
                <h1 className="md:text-[30px] font-[800] font-['Sofia'] mb-[15px] text-[20px] ">Taste your favorite recipe in a variety of exciting styles!</h1>
                <p className="md:text-[16px] font-[400] mb-[20px] text-[12px] ">Search for your favorite recipes categorized by cuisine, such as Indian, Chinese, French, and more.</p>
                <button type="button" className="bg-[orange] cursor-pointer outline-none text-[#ffffff] text-[13px] border-0 rounded-[20px] px-[16px] py-[6px] ">let's cook</button>
            </div>
        </div>
    )
}

export default SearchByCuisine