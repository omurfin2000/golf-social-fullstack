import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "./Supabase";


type SessionType = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']

const AuthContext = createContext<{
  session: SessionType
  loading: boolean
}>({ session: null, loading: true })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionType>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)