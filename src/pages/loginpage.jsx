import Header from "../components/Header";
import Login from "../components/loginform";

function LoginPage() {
    return(
        <div className=" flex-col flex items-center gap-7">
            <Header />
             <Login />
        </div>
    )
}

export default LoginPage;