import {Route, Routes, BrowserRouter} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import SearchByNamePage from './components/SearchByRecipeName/SearchByNamePage';
import './App.css';
import SearchByIngredientsPage from './components/SearchByIngredients/SearchByIngredientsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import SearchByCuisinePage from './components/SearchByCuisine/SearchByCuisinePage';
import SearchByNutritionPage from './components/SearchByNutrition/SearchByNutritionPage';
import AboutUsPage from './components/AboutUs/AboutUsPage';

function App() {

  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path='/about' exact element={<AboutUsPage />} />
              <Route
                path="/search-by-name"
                element={<ProtectedRoute element={<SearchByNamePage />} />}
              />
              <Route
                path="/search-by-ingredients"
                element={<ProtectedRoute element={<SearchByIngredientsPage />} />}
              />
              <Route
                path="/search-by-cuisine"
                element={<ProtectedRoute element={<SearchByCuisinePage />} />}
              />
              <Route
                path="/search-by-nutrition"
                element={<ProtectedRoute element={<SearchByNutritionPage />} />}
              />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
