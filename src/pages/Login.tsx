import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <LoginForm />
            <Footer />
        </div>
    )
}

export default Login