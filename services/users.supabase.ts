import { supabase } from "./configuration"

export const signUp = async (username: string, email: string, password: string, city: object) => {
    try {
        const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
            username: username,
            city: city,
            },
        },
    })

     if(error) throw new Error(`${error}`)

    return data
    } catch (error) {
        console.error(error)
    }

    
}

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        })

        if (error) throw new Error(`${error}`)
        
        return data
    } catch (error) {
         console.error(error)
    }
}

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        
        if(error) throw new Error(`${error}`)
    } catch (error) {
        console.error(error)
    }
}
