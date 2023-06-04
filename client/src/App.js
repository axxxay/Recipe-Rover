import './App.css';
import MainHomePage from './components/HomePage/MainHomePage';
import MainAuthSideBar from './components/AuthSideBar/MainAuthSideBar';

function App() {
  return (
    <div className='relative'>
      <MainHomePage />
      <MainAuthSideBar />
    </div>
  );
}

export default App;
