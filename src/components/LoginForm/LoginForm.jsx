import { useState } from 'react'

import loginService from '../../services/login'

const LoginForm = ({ user, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            setUser(user)
            setUsername('')
            setPassword('')
            console.log(`loggin in as ${username} : ${password}`)
        } catch(error) {
            // change this to a errorMessage component later
            console.log(error.message)
        }
        //...
    }

    return (
        <>
            <h1>Login Form</h1>
                <form onSubmit={handleLogin}>
                <div>
                    username:
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                    password:
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm