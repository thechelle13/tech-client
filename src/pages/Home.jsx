import { useParams } from "react-router-dom"


export const Home = ({token, setToken}) => {
  // const {tech_userId} = useParams

    return (
        <main className='welcome-container'>
          <h1 className='welcome-message'>Welcome to TechPower</h1>
          {/* <div className="welome-message">{token}</div> */}
        </main>
        
      )
}