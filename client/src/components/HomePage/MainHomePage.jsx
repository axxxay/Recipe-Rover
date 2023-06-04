import NavBar from "./NavBar"
import HomePageBanner from "./HomePageBanner"
import CookWithUs from './CookWithUs'
import SearchByName from "./SearchByName"
import SearchByNutrition from "./SearchByNutrition"
import SearchByCuisine from "./SearchByCuisine"

const MainHomePage = () => {
    return(
        <div className="font-['Roboto']">
            <NavBar/>
            <HomePageBanner/>
            <div className="homepage-bg-con w-[100%] min-h-[100vh] px-[25px] md:px-[90px] xl:px-[180px] flex flex-col items-center">
                <CookWithUs />
                <SearchByName />
                <SearchByNutrition />
                <SearchByCuisine />
            </div>
        </div>
    )
}

export default MainHomePage