import Header from "../components/Header";
import Info from "../components/info";
import Login from "../components/loginform";

function LoginPage() {
    return(
        <div className=" flex-col flex items-center gap-7">
            <Header />
            <Info />
             <div>
             <Login />
             </div>
        </div>
    )
}

export default LoginPage;