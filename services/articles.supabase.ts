import { supabase } from "./configuration"

export const getAllArticles = async () => {
    try {
        const { data } = await supabase.from('articles').select()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}