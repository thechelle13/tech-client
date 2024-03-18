import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      if ("token" in res && res.token) {
        setToken(res.token)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

  return (
    <section className="flex justify-center">
      <form className="column bg-blue-300 rounded-lg shadow-lg p-8 text-center w-96" onSubmit={handleLogin}>
        <h1 className="text-5xl font-bold mb-4 text-white">TechPower</h1>
        <p className="text-lg mb-4 text-white">Please sign in</p>

        <div className="field">
          <label className="label text-white" htmlFor="username">Username</label>
          <div className="control">
            <input  
                    id="username"
                    className="input rounded-md shadow-sm w-full py-2 px-4" 
                    type="text" 
                    ref={username} 
                    placeholder="enter your username"
                    required
                     />
          </div>
        </div>

        <div className="field">
          <label className="label text-white" htmlFor="password">Password</label>
          <div className="control">
            <input
            id="password" 
            className="input rounded-md shadow-sm w-full py-2 px-4" 
            type="password" 
            ref={password}
            placeholder="enter your password" />
          </div>
        </div>

        <div className="flex justify-between mb-4">
         
        
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700" type="submit" >
              Submit</button>
        
       
            <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700">Cancel</Link>
          
        </div>
        {
          isUnsuccessful ? <p className="text-red-500 mt-4">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}