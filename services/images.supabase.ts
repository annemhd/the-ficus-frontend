import { supabase } from "./configuration"
import { getSession } from "./users.supabase";

//taf: any
export const uploadFile = async (file: any, folder: string) => {
  const session = await getSession()

  const { data, error } = await supabase.storage.from(`images/${folder}`).upload(`${Date.now()}.jpg`, file, {
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });
  return data
}

export const deleteFile = async(path: any, folder: string) => {
  await supabase.storage.from('images').remove([`${folder}/${path}`])
}

export const getUrl = (path: any) => {
  return supabase.storage.from('images').getPublicUrl(path);
} 