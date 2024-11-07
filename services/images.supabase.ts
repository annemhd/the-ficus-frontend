import { supabase } from "./configuration"

//taf: any
export const uploadFile = async (file: any) => {
    console.log(file)

  const { data, error } = await supabase.storage.from('images/articles').upload(`${Date.now()}.jpg`, file, {
    headers: {
      Authorization: `Bearer token`
    }
  });
  // console.log(data)
  return data
}

export const getUrl = (path: any) => {
  return supabase.storage.from('images').getPublicUrl(path);
} 