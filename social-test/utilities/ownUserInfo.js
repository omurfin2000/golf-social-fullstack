import { useEffect, useState } from "react";
import { supabase } from "./Supabase";
import { useAuth } from './AuthContext'

export default function OwnUserInfo() {

    const { session, loading } = useAuth();
    const [golferInfo, setGolferInfo] = useState()

    if (loading) return null;
  
    if (!session) {
        return;
    }  

    useEffect(() => {
        const userInfo = async () => {
            const { data, error } = await supabase
            .from('golfers')
            .select('*')
            setGolferInfo(data[0])

            if (error) {
                console.log(error);
            }

            console.log(golferInfo)
        } 
        userInfo()
    }, []) 

    return;
}