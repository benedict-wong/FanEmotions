import AuthSwitch from '../components/AuthSwitch'
import Signin from '../components/Signin/Signin'
import Logo from '../components/Logo/Logo'

export default async function AuthPage() {
  return (
    <div id="auth-page">
      <Logo mode="black" />
      <div className="auth-side-container">
        <AuthSwitch />
        <Signin />
      </div>
    </div>
  )
}
