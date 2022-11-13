import React , {useContext , useState , createContext, useEffect} from 'react'

const AuthContext = createContext()
const AuthUpdateContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}
export function useUpdateAuth(){
  return useContext(AuthUpdateContext)
}

export function AuthProvider({children}){

  let cachedValue = localStorage.getItem("isAdmin")
  if(!cachedValue){
      cachedValue = false
  }else{
    cachedValue = (cachedValue === 'true')
  }

  const [isAdmin , setIsAdmin] = useState(cachedValue)
  
  useEffect(()=>{
    localStorage.setItem("isAdmin" , isAdmin)
  } , [isAdmin])

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

