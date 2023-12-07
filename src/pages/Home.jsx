import { useParams } from "react-router-dom"


export const Home = ({token, setToken}) => {
  // const {tech_userId} = useParams

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">Welcome to TechPower</h1>
       
        {/* <div className="text-lg mb-4">{token}</div> */}
      </div>
    </main>
  );
};