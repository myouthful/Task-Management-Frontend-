import Header from "../components/Header";
import SignUpForm from "../components/signupform";
import Welcome from "../components/welcome";


function SignUpPage() {
     return(
        <div className="flex-col flex items-center gap-7 ">
            <Header />
            <Welcome />
            <SignUpForm />
        </div>
     )
}


export default SignUpPage;