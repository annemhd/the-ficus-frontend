import { supabase } from "./configuration"

export const getAllArticles = async (sort: string, order: boolean, categories: string[], price: number) => {
    const query = supabase
        .from('articles')
        .select(`
            title,
            category,
            price,
            images,
            online,
            created_at,
            users!articles_user_id_fkey(username, avatar_src)
        `)

    if (sort) {
        query.order(sort, { ascending: order })
    }

    if (categories.length > 0) {
        query.in('category', categories);
    }

    if (price) {
        query.lt('price', price);
    }

    try {
        const { data, error } = await query;

        if (error) throw new Error(`Error fetching articles: ${error.message}`);
        
        return data;
    } catch (error) {
        console.error("Error in getAllArticles:", error);
        return null;
    }
};

export const addArticle = async (user_id: string, title: string, description: string, category: string, price: number, images: string[], online: boolean) => {
    const { data, error } = await supabase
        .from('articles')
        .insert([{ user_id: user_id, title: title, description: description, category: category, price: price, images: images, online: online }]
    )
 }
