import { useParams } from "react-router-dom"
// import weddev from "../assets/weddev.wedp";

export const Home = ({token, setToken}) => {
  // const {tech_userId} = useParams

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">Welcome to TechPower</h1>
        {/* <img src={weddev} alt="Welcome" className="mb-4" />
        <img 
          src="/weddev.webp" 
          alt="Welcome" 
          className="mb-4" 
        /> */}
        {/* <div className="text-lg mb-4">{token}</div> */}
      </div>
    </main>
  );
};