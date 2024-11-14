import { supabase } from "./configuration"

export const signUp = async (username: string, email: string, password: string, city: object) => {
    try {
        //taf
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

        if (error) throw new Error(`${error}`)

    return data
    } catch (error) {
        console.error(error)
    }

    
}

export const signIn = async (email: string, password: string) => {
    try {
        //taf
        const { data, error } : any = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        })

        if (error) throw new Error(`${error}`)
    
        return data
    } catch (error) {
         console.error(error)
    }
}
export const getSession = async() => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return session
}

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut({ scope: 'local' })
        
        if(error) throw new Error(`${error}`)
    } catch (error) {
        console.error(error)
    }
}

export const getUserData = async (userId: string) => {
    const query = supabase
        .from('users')
        .select(`
            id,
            username,
            email,
            avatar,
            description,
            city
        `).eq('id', userId)
    
    try {
        const { data, error } = await query;

        if (error) throw new Error(`Error fetching articles: ${error.message}`);
        
        return data;
    } catch (error) {
        console.error("Error in getAllArticles:", error);
        return null;
    }
}

export const updateUser = async (id: string, username: string, city: {}, description: string, avatar: string) => {
    const { data, error } = await supabase
        .from('users')
        .update({ username: username, city: city, description: description, avatar: avatar  })
        .eq('id', id)
    
    await supabase.rpc('update_avatar')
   

    return data
}

export const updateUserEmail = async (email: string) => {
     await supabase.auth.updateUser({
        email: email
    }, {
  redirectTo: 'http://localhost:3000',
})
}

export const updateUserPassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: password
    })

    return data
}