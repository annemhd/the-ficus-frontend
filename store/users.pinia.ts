import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUsersStore = defineStore('user', () => {
  const user:any = computed(()=> localStorage.getItem('current-user') ? JSON.parse(localStorage.getItem('current-user')?? '') : '')

  return { user }
})
