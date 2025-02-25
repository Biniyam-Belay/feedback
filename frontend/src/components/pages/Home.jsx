import Navbar from '../Navbar'
import Landingpage from '../Landingpage'
// import HomePage from '../Homepage'

const Home = () => {
  return (
    <div className="flex flex-col bg-black h-screen w-full">
      <Navbar/>
      <Landingpage />
      {/* <HomePage/> */}
    </div>
  )
}

export default Home
