

export const Home = ({token, setToken}) => {

    return (
        <main className='welcome-container'>
          <h1 className='welcome-message'>Welcome to TechPower</h1>
          <div>{token.id}</div>
        </main>
        
      )
}