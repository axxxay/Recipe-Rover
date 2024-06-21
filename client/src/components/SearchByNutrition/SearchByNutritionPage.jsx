import {BsSearch} from 'react-icons/bs'
import Switch from '@mui/material/Switch';
import {FcClearFilters} from 'react-icons/fc'
import NavBar from "../HomePage/NavBar"
import { useState } from 'react'
import {MagnifyingGlass, Oval} from 'react-loader-spinner'
import NutritionItem from './NutritionItem'
import {HowItWorks} from '../RecipeDetails/HowItWorks'
import AiRecipeItem from '../AiRecipeGen/AiRecipeItem';

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    notFound: 'NOT_FOUND',
    failure: 'FAILURE'
}

const apiKey = process.env.REACT_APP_API_KEY;

const SearchByNutritionPage = () => {

    const [recipeList, setRecipeList] = useState([])
    const [recipeInfo, setRecipeInfo] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [dataFetched, setDataFetched] = useState(false)
    const [minCarbs, setMinCarbs] = useState("")
    const [maxCarbs, setMaxCarbs] = useState("")
    const [minProtein, setMinProtein] = useState("")
    const [maxProtein, setMaxProtein] = useState("")
    const [minCalories, setMinCalories] = useState("")
    const [maxCalories, setMaxCalories] = useState("")
    const [minFat, setMinFat] = useState("")
    const [maxFat, setMaxFat] = useState("")
    const [minCholesterol, setMinCholesterol] = useState("")
    const [maxCholesterol, setMaxCholesterol] = useState("")
    const [minFiber, setMinFiber] = useState("")
    const [maxFiber, setMaxFiber] = useState("")
    const [minSugar, setMinSugar] = useState("")
    const [maxSugar, setMaxSugar] = useState("")
    const [minVitamin, setMinVitamin] = useState("")
    const [maxVitamin, setMaxVitamin] = useState("")
    const [minIron, setMinIron] = useState("")
    const [maxIron, setMaxIron] = useState("")
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
        "Urdu"
    ]

    let optionArr = []

    const onChangeLang = event => {
        setLanguage(event.target.value)
    }

    for(let i=2; i<=5; i++){
        optionArr.push(i)
    }

    const isChecked = () => {
        setApiStatus(apiStatusConstants.initial)
        setToggle(!toggle)
        setCircle(false)
    }

    const onChangeMinCarbs = event => {
        setMinCarbs(event.target.value)
    }

    const onChangeMaxCarbs = event => {
        setMaxCarbs(event.target.value)
    }

    const onChangeMinCalories = event => {
        setMinCalories(event.target.value)
    }

    const onChangeMaxCalories = event => {
        setMaxCalories(event.target.value)
    }

    const onChangeMinFat = event => {
        setMinFat(event.target.value)
    }

    const onChangeMaxFat = event => {
        setMaxFat(event.target.value)
    }

    const onChangeMinProtein = event => {
        setMinProtein(event.target.value)
    }

    const onChangeMaxProtein = event => {
        setMaxProtein(event.target.value)
    }

    const onChangeMinCholesterol = event => {
        setMinCholesterol(event.target.value)
    }

    const onChangeMaxCholesterol = event => {
        setMaxCholesterol(event.target.value)
    }

    const onChangeMinSugar = event => {
        setMinSugar(event.target.value)
    }

    const onChangeMaxSugar = event => {
        setMaxSugar(event.target.value)
    }

    const onChangeMinFiber = event => {
        setMinFiber(event.target.value)
    }

    const onChangeMaxFiber = event => {
        setMaxFiber(event.target.value)
    }

    const onChangeMinVitamin = event => {
        setMinVitamin(event.target.value)
    }

    const onChangeMaxVitamin = event => {
        setMaxVitamin(event.target.value)
    }

    const onChangeMinIron = event => {
        setMinIron(event.target.value)
    }

    const onChangeMaxIron = event => {
        setMaxIron(event.target.value)
    }

    const clearFilters = () => {
        setMinCarbs("")
        setMaxCarbs("")
        setMinProtein("")
        setMaxProtein("")
        setMinCalories("")
        setMaxCalories("")
        setMinFat("")
        setMaxFat("")
        setMinCholesterol("")
        setMaxCholesterol("")
        setMinFiber("")
        setMaxFiber("")
        setMinSugar("")
        setMaxSugar("")
        setMinVitamin("")
        setMaxVitamin("")
        setMinIron("")
        setMaxIron("")
    }

    const searchWithSpoon = async () => {

        setApiStatus(apiStatusConstants.inProgress)

        let url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/findByNutrients?`
        if(minCarbs !== "" && maxCarbs !== "") {
            url += `minCarbs=${minCarbs}&maxCarbs=${maxCarbs}&`
        }
        if(minProtein !== "" && maxProtein !== "") {
            url += `minProtein=${minProtein}&maxProtein=${maxProtein}&`
        }
        if(minCalories !== "" && maxCalories !== "") {
            url += `minCalories=${minCalories}&maxCalories=${maxCalories}&`
        }
        if(minFat !== "" && maxFat !== "") {
            url += `minFat=${minFat}&maxFat=${maxFat}&`
        }
        if(minCholesterol !== "" && maxCholesterol !== "") {
            url += `minCholesterol=${minCholesterol}&maxCholesterol=${maxCholesterol}&`
        }
        if(minVitamin !== "" && maxVitamin !== "") {
            url += `minVitaminC=${minVitamin}&maxVitaminC=${maxVitamin}&`
        }
        if(minFiber !== "" && maxFiber !== "") {
            url += `minFiber=${minFiber}&maxFiber=${maxFiber}&`
        }
        if(minIron !== "" && maxIron !== "") {
            url += `minIron=${minIron}&maxIron=${maxIron}&`
        }
        if(minSugar !== "" && maxSugar !== "") {
            url += `minSugar=${minSugar}&maxSugar=${maxSugar}&`
        }
        url += `number=1`

        console.log(url)
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-api-key': '437a97f1c1454e9d8c2c44d2f248852d'
            },
        }
        const response = await fetch(url, options)
        
        if (response.ok === true) {
            const recipeData = await response.json()
            console.log(recipeData)
            if(recipeData.length === 0) {
                setApiStatus(apiStatusConstants.notFound)
                setCircle(false)
            } else {
                setApiStatus(apiStatusConstants.success)
                setRecipeList(recipeData)
                getRecipeDetails(recipeData[0].id)
            }
        } else {
            setApiStatus(apiStatusConstants.failure)
            setCircle(false)
        }
        
    }

    const getRecipeDetails = async (id) => {
        const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/${id}/analyzedInstructions`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-api-key': '437a97f1c1454e9d8c2c44d2f248852d'
            },
        }
        const response = await fetch(url, options)
        const recipeData = await response.json()
        if (response.ok === true) {
            const data = recipeData[0]
            const updatedData = {
                steps: data.steps.map(eachItem => eachItem.step)
            }
            setRecipeInfo(updatedData)
            getRecipeIngredients(id)
        } else {
            console.log("error")
        }
    }

    const getRecipeIngredients = async (id) => {
        const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/${id}/ingredientWidget.json`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-api-key': '437a97f1c1454e9d8c2c44d2f248852d'
            },
        }
        const response = await fetch(url, options)
        const recipeData = await response.json()
        console.log(recipeData)
        if (response.ok === true) {
           
            const data = recipeData.ingredients
            const updatedData = {
                ingredients: data.map(eachItem => eachItem.name)
            }
            setIngredients(updatedData)
            setDataFetched(true)
            setCircle(false)
        } else {
            setCircle(false)
            console.log("error")
        }
    }


    const searchWithAI = async () => {

        setApiStatus(apiStatusConstants.inProgress)

        let nutriQuery = ""

        if(minCarbs !== "" && maxCarbs !== "") {
            nutriQuery += `minCarbs: ${minCarbs}g & maxCarbs: ${maxCarbs}g,`
        }
        if(minProtein !== "" && maxProtein !== "") {
            nutriQuery += `minProtein: ${minProtein}g & maxProtein: ${maxProtein}g,`
        }
        if(minCalories !== "" && maxCalories !== "") {
            nutriQuery += `minCalories: ${minCalories}kcal & maxCalories: ${maxCalories}kcal,`
        }
        if(minFat !== "" && maxFat !== "") {
            nutriQuery += `minFat: ${minFat}g & maxFat=${maxFat}g,`
        }
        if(minCholesterol !== "" && maxCholesterol !== "") {
            nutriQuery += `minCholesterol: ${minCholesterol}mg & maxCholesterol:${maxCholesterol}mg,`
        }
        if(minVitamin !== "" && maxVitamin !== "") {
            nutriQuery += `minVitaminC: ${minVitamin}mg & maxVitaminC: ${maxVitamin}mg,`
        }
        if(minFiber !== "" && maxFiber !== "") {
            nutriQuery += `minFiber: ${minFiber}g & maxFiber: ${maxFiber}g,`
        }
        if(minIron !== "" && maxIron !== "") {
            nutriQuery += `minIron: ${minIron}mcg & maxIron=${maxIron}mcg,`
        }
        if(minSugar !== "" && maxSugar !== "") {
            nutriQuery += `minSugar: ${minSugar}g & maxSugar: ${maxSugar}g,`
        }

        const prompt = `
            You are a recipe book with a vast collection of recipes, including various cuisines, with a focus on Indian cuisines. Each recipe includes the following details: title, ingredients, diet, cuisine, time to cook, instructions, nutritional information (calories, carbohydrates, protein, fat, vitamins, iron, cholesterol, sugar, and fiber), and, if available, an image link.

            When I search with nutritional values, your task is to provide a relevant recipe (preferably an Indian recipe) that falls within the specified nutritional value ranges in JSON format, structured as follows:

            {
                "title": "string",
                "cuisine": "string",
                "no_of_servings": integer,
                "diet": "string",
                "ingredients": ["string", "string", ...],
                "nutritional_info": {
                    "calories": integer,
                    "carbohydrates": integer,
                    "protein": integer,
                    "fat": integer,
                    "vitamins": integer,
                    "iron": integer,
                    "cholesterol": integer,
                    "sugar": integer,
                    "fiber": integer
                },
                "time_to_cook": integer,
                "instructions": ["string", "string", ...],
                "image_link": "string"
            }            

            Recipe instructions should be very detailed and clear, including timestamps for each step, such as "boil for 5 mins," "add chili powder after 10 mins," "keep the lid on for 10 mins," and so on. The ingredients list should include all ingredients used, ensuring the recipe is very detailed.

            If the user specifies a response language (e.g., Telugu, Hindi, Tamil, etc.), provide the recipe details in that language, but ensure all JSON key names remain in English.

            If the search query does not match any recipe or if you are unable to find any recipe details, respond with an error message in JSON format as follows:

            {
                "error": "respective error message"
            }

            The recipe query request should look like this:

            "Nutritional values: [minCarbs: 10g & maxCarbs: 25g, minFat: 2g & maxFat: 10g, ...], Language: language"

            The recipe you provide should strictly fall within the specified nutritional values. For example, if minCarbs = 10g and maxCarbs = 25g, the recipe's carbohydrate content should be between 10g and 25g, such as Carbs = 15g.

            Language is optional. If the user selects a language, respond in that language; otherwise, use English.

            Please respond strictly in the specified JSON format with no additional messages.
        `


        const userQuery = `Nutritional values: [${nutriQuery}], Language: ${language}`;

        
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
                console.log(recipeData, typeof(recipeData))
                if(recipeData.length === 0 || (JSON.parse(recipeData.choices[0].message.content).error)) {
                    setApiStatus(apiStatusConstants.notFound)
                } else {
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
        if((minCarbs === "" || maxCarbs === "") && (minProtein === "" || maxProtein === "") && (minCalories === "" || maxCalories === "") && (minFat === "" || maxFat === "") && (minCholesterol === "" || maxCholesterol === "") && (minVitamin === "" || maxVitamin === "") && (minFiber === "" || maxFiber === "") && (minIron === "" || maxIron === "") && (minSugar === "" || maxSugar === "")){
            console.log("triggered")
            return
        }
        setCircle(true)
        if (toggle) {
            searchWithAI()

        } else {
            searchWithSpoon()
        }
    }

    const renderSearchResults = () => (
        <div className='w-[100%] md:w-[70%] md:mt-[30px] mt-[15px]'>
            {
                toggle ? <AiRecipeItem recipeList={recipeList} /> :
                (dataFetched && <NutritionItem recipeList={recipeList} ingredients={ingredients} recipeInfo={recipeInfo} />)
            }
        </div>
    )

    const renderInitialStatus = () => (
        <div className='min-h-[65vh] text-center md:min-h-[70vh] flex flex-col items-center justify-center w-[100%]'>
            <img src='/search-recipe-img.jpg' alt='search recipe' className='md:w-[35%] w-[90%]' />
            <p className='md:text-[23px] text-[20px] mt-2 text-[#474747] font-bold font-["Roboto"] '>Search recipes by giving nutritional values</p>
        </div>
    )

    const renderNoResultsFound = () => (
        <div className='min-h-[65vh] text-center md:min-h-[70vh] flex flex-col items-center justify-center w-[100%]'>
            <img src='/no-results-found.jpg' alt='search recipe' className='md:w-[35%] w-[90%]' />
            <p className='md:text-[23px] text-[20px] mt-[-35px] text-[#474747] font-bold font-["Roboto"] '>Oops! No Recipes Found</p>
            <p className='md:text-[14px] text-[12px] mt-1 text-[#7c7c7d] font-["Roboto"] '>Try searching with different nutritional values</p>
        </div>
    )

    const renderFailure = () => (
        <div className='min-h-[65vh] text-center md:min-h-[70vh] flex flex-col items-center justify-center w-[100%]'>
            <img src='/unauthorized-img.jpg' alt='search recipe' className='md:w-[32%] w-[90%]' />
            <p className='md:text-[23px] text-[20px] mt-[0px] text-[#474747] font-bold font-["Roboto"] '>Oops! Something Went Wrong!</p>
            <button type='button' onClick={searchWithSpoon} className='bg-[#e26310] text-[white] text-[13px] rounded px-[15px] mt-[10px] py-[6px] font-[500] font-["Roboto"] '>Search Again</button>
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

    const AccordianText = `Give the expected nutritional values in the respective nutrition input boxes, Each nutrition contains two input boxes, the min box refers to minimum nutrition value and max box refers to maximum nutrition value. <br /> <br /> Ex: Carbs: min - 20, max - 10 <br /> <br /> Note: For best results try to give atleast 4 types of nutritional values, such as carbs, calories, fat, protien, etc..`

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return (
        <>
            <NavBar />
            <div className="w-[100%] min-h-[100vh] md:px-[50px] p-[20px] pt-[90px] flex flex-col items-center ">
                <div className='flex md:flex-row flex-col w-[100%] justify-center items-center md:items-start'>
                    <HowItWorks AccordianText={AccordianText} />
                    <div className='flex flex-row items-center md:ml-3'>
                        <Switch {...label} checked={toggle} onClick={isChecked}  color="warning" id='toggle' label="some" className='z-[-10]' />
                        <label htmlFor='toggle' className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>Ai Search</label>
                    </div>
                </div>
                <div className='flex items-center mt-3 flex-wrap justify-center md:justify-start'>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>CARBS</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minCarbs} onChange={onChangeMinCarbs} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxCarbs} onChange={onChangeMaxCarbs} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>PROTIEN</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minProtein} onChange={onChangeMinProtein} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxProtein} onChange={onChangeMaxProtein} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>CALORIES</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minCalories} onChange={onChangeMinCalories} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2"  />
                            <input type="number" placeholder="Max" value={maxCalories} onChange={onChangeMaxCalories} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>FAT</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minFat} onChange={onChangeMinFat} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxFat} onChange={onChangeMaxFat} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>CHOLESTEROL</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minCholesterol} onChange={onChangeMinCholesterol} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2"/>
                            <input type="number" placeholder="Max" value={maxCholesterol} onChange={onChangeMaxCholesterol} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2"/>
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>FIBER</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minFiber} onChange={onChangeMinFiber} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxFiber} onChange={onChangeMaxFiber} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>SUGAR</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minSugar} onChange={onChangeMinSugar} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxSugar} onChange={onChangeMaxSugar} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>VITAMIN</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minVitamin} onChange={onChangeMinVitamin} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxVitamin} onChange={onChangeMaxVitamin} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[80px] border-[0.5px] bg-[#ababab] mx-2'></div>
                    <div className='text-center'>
                        <h1 className='md:text-[15px] text-[13px] font-bold font-["Roboto"] text-[#606060]'>IRON</h1>
                        <div className='flex items-center'>
                            <input type="number" placeholder="Min" value={minIron} onChange={onChangeMinIron} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                            <input type="number" placeholder="Max" value={maxIron} onChange={onChangeMaxIron} className="md:w-[40px] w-[35px] h-[30px] text-[13px] border-[1px] border-[solid] border-[gray] rounded-[5px] md:h-[35px] outline-none pl-1 md:text-[15px] font-['Roboto'] m-2" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-center w-[100%] '>
                    <div className='flex items-center w-[95%] md:w-auto justify-evenly mt-3 md:mt-auto md:justify-start '>
                        <button type='button' onClick={clearFilters} className='flex items-center cursor-pointer m-2 bg-[white] border-[#e26310] border-solid border-[1px] text-[14px] font-[600] font-["Roboto"] h-[35px] px-[15px] rounded-[6px] text-[#e26310] ' >
                            Clear
                            <FcClearFilters className='text-[15px] text-[white] ml-[3px]' />
                        </button>
                        <button type='button' disabled={circle} onClick={onClickSearch} className='flex items-center justify-center cursor-pointer m-2 bg-[#e26310] text-[14px] font-[500] font-["Roboto"] h-[35px] w-[85px] rounded-[6px] text-[white] ' >
                            {
                                circle ? 
                                (<Oval
                                height={20}
                                width={20}
                                color="#ffffff"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#ffffff"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                                />) :
                                (<span className='flex items-center'>
                                    Search
                                    <BsSearch className='text-[13px] text-[white] ml-[3px]' />
                                </span>)
                            }
                        </button>
                        {
                            toggle &&
                            <select onChange={onChangeLang} className=' bg-transparent md:ml-[8px] ml-2 w-[75px] pl-[5px] text-[15px] border-[1px] border-[solid] border-[gray] rounded-lg h-[35px] outline-none'>
                                {languageList.map(eachItem => (<option key={eachItem} value={eachItem}>{eachItem}</option>))}
                            </select>
                        }
                    </div>
                </div>
                {renderAllSections()}
            </div>
        </>
    )
}

export default SearchByNutritionPage