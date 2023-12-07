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
      <form className="column bg-white rounded-lg shadow-lg p-8 text-center w-96" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-4">TechPower</h1>
        <p className="text-lg mb-4">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input  className="input rounded-md shadow-sm w-full py-2 px-4" 
                    type="text" 
                    ref={username} 
                    placeholder="enter your username" />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input 
            className="input rounded-md shadow-sm w-full py-2 px-4" 
            type="password" 
            ref={password}
            placeholder="enter your password" />
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="control">
            <button className="button bg-blue-500 text-white hover:bg-blue-700" type="submit" >Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="text-red-500 mt-4">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}