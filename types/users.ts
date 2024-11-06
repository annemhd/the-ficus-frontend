export interface signUpForm {
    username: string
    email: string
    password: string
    confirmPassword?: string
    city: {}
}

export interface signInForm {
    email: string
    password: string
}
