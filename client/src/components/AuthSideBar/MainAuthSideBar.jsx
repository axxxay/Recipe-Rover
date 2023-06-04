import LoginPage from "./LoginPage"
import RegistrationPage from "./RegistrationPage"
import SideNavBar from "./SideNavBar"

const MainAuthSideBar = () => {
    return(
        <div className="login-page-modal">
            <div className="login-page-overlay"></div>
            <div className="login-page-modal-content">
                <SideNavBar />
                <LoginPage />
                {/* <RegistrationPage /> */}
            </div>
        </div>
    )
}

export default MainAuthSideBar