import Header from "../components/Header";
import SignUpForm from "../components/signupform";
import Welcome from "../components/welcome";
import { Link } from "react-router-dom";


function SignUpPage() {
     return(
        <div className="flex-col flex items-center gap-6 ">
            <Header />
            <Welcome />
            <SignUpForm />
            <div className="mt-1 text-center">
                <p className="text-[14px] text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
     )
}


export default SignUpPage;