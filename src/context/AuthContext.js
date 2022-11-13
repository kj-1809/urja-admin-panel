import React , {useContext , useState , createContext} from 'react'

const AuthContext = createContext()
const AuthUpdateContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}
export function useUpdateAuth(){
  return useContext(AuthUpdateContext)
}

export function AuthProvider({children}){
  const [isAdmin , setIsAdmin] = useState(false)
  
  function changeAuthState(currentAuthState){
    setIsAdmin(currentAuthState)
  }

  return (
    <AuthContext.Provider value = {isAdmin}>
      <AuthUpdateContext.Provider value = {changeAuthState}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  )
}

