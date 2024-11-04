export const useUser = () => {
    const user = useState('user', () => null)

    const setUser = (newUser) => {
        user.value = newUser
    }

    return {
        user,
        setUser,
    }
}
