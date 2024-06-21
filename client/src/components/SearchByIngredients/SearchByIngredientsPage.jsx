import {BsSearch} from 'react-icons/bs'
import NavBar from '../HomePage/NavBar'
import Switch from '@mui/material/Switch';
import RecipeItem from '../SearchByRecipeName/RecipeItem'
import {MagnifyingGlass, Oval} from 'react-loader-spinner'
import { useState } from 'react'
import Cookies from 'js-cookie'
import AiRecipeItem from '../AiRecipeGen/AiRecipeItem';
import { HowItWorksIngredients } from '../RecipeDetails/HowItWorks';

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    notFound: 'NOT_FOUND',
    failure: 'FAILURE'
}

const apiKey = process.env.REACT_APP_API_KEY;

const SearchByIngredientsPage = () => {

    const [recipeList, setRecipeList] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [limit, setLimit] = useState(1)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [toggle, setToggle] = useState(false)
    const [language, setLanguage] = useState("English")
    const [circle, setCircle] = useState(false)

    const languageList = [
        "English",
        "Telugu",
        "Hindi",
        "Tamil",
        "Gujarati",
        "Marathi",
        "Malayalam",
        "Kannada",
        "Bengali",
        "Punjabi",
        "Urdu",
        "Manipuri"
    ]

    const isChecked = () => {
        setApiStatus(apiStatusConstants.initial)
        setToggle(!toggle)
        setCircle(false)
    }

    const onChangeLang = event => {
        setLanguage(event.target.value)
    }

    let optionArr = []
    for(let i=2; i<=10; i++){
        optionArr.push(i)
    }

    const onChangeSearchInput = event => {
        setSearchInput(event.target.value)
    }

    const onChangeLimit = event => {
        setLimit(parseInt(event.target.value))
    }

    const onPressEnter = event => {
        if(event.key === "Enter"){
            onClickSearch()
        }
    }

    const searchRecipeDetails = async () => {
        if (searchInput === "") {
            return
        }

        setApiStatus(apiStatusConstants.inProgress)
        const jwtToken = Cookies.get("jwtToken")
        const query = `ingredients=${searchInput}&limit=${limit}`
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/recipes/ingredients/?${query}`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
            const recipeData = await response.json()
            if(recipeData.length === 0) {
                setApiStatus(apiStatusConstants.notFound)
                setCircle(false)
            } else {
                setApiStatus(apiStatusConstants.success)
                setRecipeList(recipeData)
                setCircle(false)
            }
        } else {
            setApiStatus(apiStatusConstants.failure)
            setCircle(false)
        }
        
    }


    const searchWithAI = async () => {

        setApiStatus(apiStatusConstants.inProgress)

        const prompt = `
            You are a recipe book with a vast collection of recipes, including various cuisines, with a focus on Indian cuisines. Each recipe includes the following details: title, ingredients, diet, cuisine, time to cook, instructions, nutritional information (calories, carbohydrates, protein, fat, fiber), and, if available, an image link.

            When I search with ingredients, your task is to provide the relevant recipe (preferably an Indian recipe) in JSON format, structured as follows:
            {
                "title": "string",
                "cuisine": "string",
                "no_of_servings": integer,
                "diet": "string",
                "ingredients": ["string", "string", "string"],
                "ingredients_might_include": ["string", "string"],
                "nutritional_info": {
                    "calories": integer,
                    "carbohydrates": integer,
                    "protein": integer,
                    "fat": integer,
                    "fiber": integer
                },
                "time_to_cook": integer,
                "instructions": ["string", "string", "string"],
                "image_link": "string"
            }

            If the response includes ingredients not specified in the user's query, list those under "ingredients_might_include."

            Recipe instructions should be very detailed and clear, including time stamps for the recipe instructions like "boil for 5 mins", "put chili powder after 10 mins", "keep the lid for 10 mins", and so on. Additionally, in the ingredients list, include all ingredients that are being used. Once again, the recipe should be very, very detailed.
                        
            If the user specifies a response language (e.g., Telugu, Hindi, Tamil, etc.), provide the recipe details in that language, but ensure all JSON key names remain in English.
            
            If the search query does not match any recipe or if you are unable to find any recipe details, respond with an error message in JSON format as follows:

            {
                "error": "respective error message"
            }
            
            The recipe query request should look like this:

            "Ingredients: ingredient1, ingredient2, ingredient13, ... , Language: language"
            
            Language is optional. If the user selects a language, respond in that language; otherwise, use English.

            Please respond strictly in the specified JSON format with no additional messages.    
        `

        const userQuery = `Ingredients: ${searchInput}, Language: ${language}`;

        
        const apiUrl = process.env.REACT_APP_OPENAI_API_URL;
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                    role: "system",
                    content: `${prompt}`
                },
                {
                    role: "user",
                    content: `${userQuery}`
                }
              ],
              temperature: 0.7,
            }),
          }
        
        try {
            const response = await fetch(apiUrl, options)
            if (response.ok === true) {
                const recipeData = await response.json()
                console.log(recipeData)
                if(recipeData.length === 0 || (JSON.parse(recipeData.choices[0].message.content).error)) {
                    setApiStatus(apiStatusConstants.notFound)
                } else {
                    console.log(JSON.parse(recipeData.choices[0].message.content))
                    const AiRecipeData = JSON.parse(recipeData.choices[0].message.content)
                    setRecipeList(AiRecipeData)
                    setApiStatus(apiStatusConstants.success)
                }
            } else {
                setApiStatus(apiStatusConstants.failure)
            }
        } catch (error) {
            console.error("Error fetching recipe:", error);
            throw error;
        } finally {
            setCircle(false)
        }
    }

    const onClickSearch = () => {
        if(searchInput === "") {
            return
        }
        setCircle(true)
        if (toggle) {
            searchWithAI()
            console.log("Ai")
        } else {
            searchRecipeDetails()
            console.log("db")
        }
    }

    const renderSearchResults = () => (
        <ul className='w-[100%] md:w-[70%] md:mt-[50px] mt-[20px] '>
            {
                toggle ? <AiRecipeItem recipeList={recipeList} /> :
                recipeList.map(eachItem => <RecipeItem key={eachItem.Srno} recipeDetails={eachItem} /> )
            }
        </ul>
    )

    const renderInitialStatus = () => (
        <div className='min-h-[65vh] text-center md:min-h-[70vh] flex flex-col items-center justify-center w-[100%]'>
            <img src='/search-recipe-img.jpg' alt='search recipe' className='md:w-[35%] w-[90%]' />
            <p className='md:text-[23px] text-[20px] mt-2 text-[#474747] font-bold font-["Roboto"] '>Search recipes by their Ingredients</p>
        </div>
    )

    const renderNoResultsFound = () => (
        <div className='min-h-[65vh] text-center md:min-h-[70vh] flex flex-col items-center justify-center w-[100%]'>
            <img src='/no-results-found.jpg' alt='search recipe' className='md:w-[35%] w-[90%]' />
            <p className='md:text-[23px] text-[20px] mt-[-35px] text-[#474747] font-bold font-["Roboto"] '>Oops! No Recipes Found</p>
            <p className='md:text-[14px] text-[12px] mt-1 text-[#7c7c7d] font-["Roboto"] '>Try searching with different Ingredients</p>
        </div>
    )

    const renderFailure = () => (
        <div className='min-h-[65vh] text-center md:min-h-[70vh] flex flex-col items-center justify-center w-[100%]'>
            <img src='/unauthorized-img.jpg' alt='search recipe' className='md:w-[32%] w-[90%]' />
            <p className='md:text-[23px] text-[20px] mt-[0px] text-[#474747] font-bold font-["Roboto"] '>Oops! Something Went Wrong!</p>
            <button type='button' onClick={onClickSearch} className='bg-[#e26310] text-[white] text-[13px] rounded px-[15px] mt-[10px] py-[6px] font-[500] font-["Roboto"] '>Search Again</button>
        </div>
    )

    const renderLoader = () => (
        <div className="md:h-[75vh] h-[67vh] flex flex-col items-center justify-center ">
            <MagnifyingGlass
                visible={true}
                height="70"
                width="70"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#c0efff'
                color = '#e26310'
            />
            <p className='text-[16px] font-["Roboto"] text-[#606060]'>Cooking...</p>
        </div>
    )

    const renderAllSections = () => {
        switch (apiStatus) {
            case apiStatusConstants.initial:
                return renderInitialStatus()
            case apiStatusConstants.inProgress:
                return renderLoader()
            case apiStatusConstants.success:
                return renderSearchResults()
            case apiStatusConstants.notFound:
                return renderNoResultsFound()
            case apiStatusConstants.failure:
                return renderFailure()
            default:
                return null
        }
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };


    return (
        <>
            <NavBar />
            <div className="w-[100%] min-h-[100vh] md:px-[50px] p-[20px] pt-[100px] flex flex-col items-center ">
                    <HowItWorksIngredients />
                <div className='flex flex-col md:flex-row items-center justify-center w-[100%] '>
                    <div className="md:w-[50%] w-[95%] flex items-center border-[1px] mt-4 md:mt-5 border-[solid] border-[gray] rounded-lg h-[35px]">
                        <input type="search" placeholder="Search by Ingredients" value={searchInput} onChange={onChangeSearchInput} onKeyDown={onPressEnter} className="w-[100%] border-0 outline-none pl-3 text-[15px] font-['Roboto'] " />
                        <button onClick={onClickSearch} disabled={circle} className="border-0 p-0 bg-[transparent] outline-none " type="button">
                        {
                            circle ? 
                            (<div className='mx-4'>
                                <Oval
                                height={18}
                                width={18}
                                color="darkgray"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#ffffff"
                                strokeWidth={2}
                                strokeWidthSecondary={5}
                                />
                            </div>)
                            :
                            <BsSearch className='text-[18px] mx-4 text-[darkgray]' />
                        }
                        </button>
                    </div>
                    <div className='flex items-center w-[95%] md:w-auto justify-evenly mt-3 md:mt-auto md:justify-start '>
                        { 
                            !toggle && 
                            <select onChange={onChangeLimit} className=' md:ml-[20px] w-[65px] pl-[5px] text-[15px] border-[1px] border-[solid] border-[gray] bg-transparent rounded-lg h-[35px] outline-none'>
                                <option value={1}>Limit</option>
                                {optionArr.map(eachItem => <option key={eachItem} value={eachItem} >{eachItem}</option>)}
                            </select>
                        }
                        
                        {
                            toggle &&
                            <select onChange={onChangeLang} className=' md:ml-[20px] w-[75px] pl-[5px] text-[15px] border-[1px] bg-transparent border-[solid] border-[gray] rounded-lg h-[35px] outline-none'>
                                {languageList.map(eachItem => (<option key={eachItem} value={eachItem}>{eachItem}</option>))}
                            </select>
                        }
                        <div className='flex flex-row items-center md:ml-3'>
                            <Switch {...label} checked={toggle} onClick={isChecked} id='toggle'  color="warning" label="some" />
                            <label className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]' htmlFor='toggle' >Ai Search</label>
                        </div>
                    </div>
                </div>
                {renderAllSections()}
            </div>
        </>
    )
}

export default SearchByIngredientsPage