import { supabase } from "./configuration"

//taf: any
export const uploadFile = async (file: any) => {
    console.log(file)

  const { data, error } = await supabase.storage.from('images/articles').upload(`${Date.now()}.jpg`, file, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlNG1qQ2tTdzFQUUxnUHIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3N6Z2pxYW1mamFiZnRweGJieGVuLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI0NWU5MDM1My03NzgzLTQ2NmEtODE0MS03YTI3Y2M4MjYwYjAiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMwOTQ0MjU2LCJpYXQiOjE3MzA5NDA2NTYsImVtYWlsIjoiYW5uZWNhdGhlcmluZS5taWNoYXVkQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiY2l0eSI6eyJfc2NvcmUiOjEuMzk0MjcxODY4OTc3NDM2NywiY29kZSI6IjkzMDQ4IiwiZGVwYXJ0ZW1lbnQiOnsiY29kZSI6IjkzIiwibm9tIjoiU2VpbmUtU2FpbnQtRGVuaXMifSwibm9tIjoiTW9udHJldWlsIn0sImVtYWlsIjoiYW5uZWNhdGhlcmluZS5taWNoYXVkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI0NWU5MDM1My03NzgzLTQ2NmEtODE0MS03YTI3Y2M4MjYwYjAiLCJ1c2VybmFtZSI6ImFubmVrYSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzMwOTQwNjU2fV0sInNlc3Npb25faWQiOiJlMzViNWM1Mi00MDU4LTQ2MWItOTFiOS02ZjAyYzc3ZWQwMDkiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.WwZFT568G25VR1hyCw08ZeYr4FhvCned9P9un_HWuA0`
    }
  });
  // console.log(data)
  return data
}

export const getUrl = (path: any) => {
  return supabase.storage.from('images').getPublicUrl(path);
} 