import { useState } from 'react'

import loginService from '../../services/login'
import blogService from '../../services/blogs'

const LoginForm = ({ user, setUser, setMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // only censors password in the console.log statement in handleLogin()
    const passwordCensor = (password) => {
        let str = []
        for(let i = 0; i < password.length; i++) {
            str.push('*')
        }
        str = str.join('')
        return str
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user)
            ) 
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            console.log(`logging in as ${username} : ${passwordCensor(password)} : ${user.token}`)
            setMessage(`Welcome ${user.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        } catch(error) {
            // change this to a errorMessage component later
            console.log(error.name, error.message)
            setMessage('Wrong credentials')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
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