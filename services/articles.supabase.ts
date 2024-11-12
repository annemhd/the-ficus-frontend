import { supabase } from "./configuration"

export const getAllArticles = async (sort: string, order: boolean, categories: string[],cities: object[] , price: number | null) => {
    const query = supabase
        .from('articles')
        .select(`
            username,
            avatar,
            title,
            category,
            price,
            images,
            city_name,
            city_code,
            online,
            created_at
        `)
    
    if (sort) {
        query.order(sort, { ascending: order })
    }

    if (categories.length > 0) {
        query.in('category', categories);
    }

    if (cities && cities.length > 0) {
        const cityFilters = cities.map(city => {
            console.log(cities)
            const filters = [];
            if (city) filters.push(`city_name.eq.${city}`);
            return filters;
        });
        
        query.or(cityFilters.join(','));
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
}

export const getArticlesByUser = async (userId: string, sort: string, order: boolean, categories: string[],cities: object[] , price: number | null) => {
    const query = supabase
        .from('articles')
        .select(`
            username,
            avatar,
            title,
            category,
            price,
            images,
            city_name,
            city_code,
            online,
            created_at
        `).eq('user_id', userId)
    
    if (sort) {
        query.order(sort, { ascending: order })
    }

    if (categories.length > 0) {
        query.in('category', categories);
    }

    if (cities && cities.length > 0) {
        const cityFilters = cities.map(city => {
            const filters = [];
            if (city) filters.push(`city_name.eq.${city}`);
            return filters;
        });
        
        query.or(cityFilters.join(','));
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
}

export const addArticle = async (user_id: string, title: string, description: string, category: string, price: number, images: string[], online: boolean) => {
    const { data, error } = await supabase
        .from('articles')
        .insert([{ user_id: user_id, title: title, description: description, category: category, price: price, images: images, online: online }]
    )
 }
