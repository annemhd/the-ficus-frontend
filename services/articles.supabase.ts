import { supabase } from "./configuration"

export const getAllArticles = async () => {
    try {
        const { data, error } = await supabase
            .from('articles')
            .select(`
                title,
                price,
                images,
                online,
                created_at,
                users!articles_user_id_fkey(username, avatar_src)
        `);

        if (error) throw new Error(`${error}`)
        
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addArticle = async (user_id: string, title: string, description: string, category: string, price: number, images: string[], online: boolean) => {
    const { data, error } = await supabase
        .from('articles')
        .insert([{ user_id: user_id, title: title, description: description, category: category, price: price, images: images, online: online }]
    )
 }
