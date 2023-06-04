import './MainHomePage.css'

const HomePageBanner = () => {
    return (
        <div className="homepage-bg flex flex-col justify-center items-center">
            <h1 className="font-['Sofia'] md:text-[60px] md:w-[50%] text-center font-[900] mb-[35px] m-0 text-[35px] w-[85%] ">Recipe From Us, Cooking From You!</h1>
            <p className="md:text-[15px] md:w-[40%] text-center font-[900] text-[15px] w-[80%]">Experience a homemade meal with your own hands, with our exciting recipes</p>
        </div>
    )
}

export default HomePageBanner