import logo from '../assets/react.svg'
import Dropdown from './Dropdown'

const LoginNav = () => {

  return (
    <div className="flex bg-black h-15 justify-around items-center">
        <div className="bg-red h-10 text-white flex justify-center items-center">
            <img src={logo} alt="logo" />
        </div>
        <div><Dropdown /></div>
        <div className="bg-red h-10 text-white flex justify-center items-center">
            <img src={logo} alt="logo" />
        </div>
    </div>
  )
}

export default LoginNav
