/* eslint-disable react/prop-types */
const Card = ({img, name}) => {
  return (
    <div className="flex min-h-screen flex-col items-center">
        <div className="flex flex-wrap justify-center items-center mt-10 h-[200px] w-[200px] border-gray-100/50 border rounded-lg backdrop-blur-3xl shadow-lg">
            <div className="flex gap-5 justify-center items-center h-[180px] w-[180px rounded-lg backdrop-blur-3xl shadow-lg">
                <img 
                    src={img} 
                    alt="" />
            </div>
        </div>
        <p className="mt-5 uppercase font-medium leading-1">{name}</p>   
        <div className="bg-gray-500 h-0.5 w-full mt-5 rounded-full"></div>    
    </div>
    
  )
}

export default Card
