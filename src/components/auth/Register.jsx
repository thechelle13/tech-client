import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"

export const Register = ({setToken}) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    
    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value
      }

      registerUser(newUser)
        .then(res => {
          if ("token" in res && res.token) {
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <section className="flex justify-center">
      <form className="column bg-white rounded-lg shadow-lg p-8 text-center w-96" onSubmit={handleRegister}>
        <h1 className="text-3xl font-bold mb-4">TechPower</h1>
        <p className="text-lg mb-4">Create an account</p>

        <div className="field mb-4">
          <label className="label" htmlFor="firstName">First Name</label>
          <div className="control">
            <input className="input rounded-md shadow-sm w-full py-2 px-4" type="text" ref={firstName} id="firstName" placeholder="Enter your first name" />
          </div>
        </div>

        <div className="field mb-4">
          <label className="label" htmlFor="lastName">Last Name</label>
          <div className="control">
            <input className="input rounded-md shadow-sm w-full py-2 px-4" type="text" ref={lastName} id="lastName" placeholder="Enter your last name" />
          </div>
        </div>

        <div className="field mb-4">
          <label className="label" htmlFor="username">Username</label>
          <div className="control">
            <input className="input rounded-md shadow-sm w-full py-2 px-4" type="text" ref={username} id="username" placeholder="Choose a username" autoComplete="username"/>
          </div>
        </div>

        <div className="field mb-4">
          <label className="label" htmlFor="email">Email</label>
          <div className="control">
            <input className="input rounded-md shadow-sm w-full py-2 px-4" type="email" ref={email} id="email" placeholder="Enter your email" autoComplete="email" />
          </div>
        </div>

        <div className="field mb-4">
          <label className="label" htmlFor="password">Password</label>
          <div className="control">
            <input className="input rounded-md shadow-sm w-full py-2 px-4" type="password" ref={password} id="password" placeholder="Enter your password" />
          </div>
        </div>

        <div className="field mb-4">
          <label className="label" htmlFor="vpass">Verify Password</label>
          <div className="control">
            <input className="input rounded-md shadow-sm w-full py-2 px-4" type="password" ref={verifyPassword} id="vpass" placeholder="Verify your password" />
          </div>
        </div>

        <div className="field mb-4">
          <label className="label" htmlFor="bio">Bio</label>
          <div className="control">
            <textarea className="textarea rounded-md shadow-sm w-full py-2 px-4"
                      id="bio" 
                      placeholder="Tell us about yourself..." 
                      ref={bio}>
            </textarea>
          </div>
        </div>

        {/* <div className="field is-grouped justify-between mb-4"> */}
        <div className="flex justify-between mb-4">
          <div className="control">
            <button className="button bg-blue-500 text-white hover:bg-blue-700" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
      </form>
    </section>
  );
};