import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../../store/auth-context"

const Logout = () => {
    const ctxAuth = useContext(AuthContext)
    const history = useHistory()
    const { tokenHandler } = ctxAuth

    useEffect(()=>{
        tokenHandler(false)
        history.push('/home')
    },[tokenHandler, history])

    return null
}

export default Logout