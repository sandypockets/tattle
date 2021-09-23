import React from 'react'
import Auth from "../components/Auth";

export default { title: 'Registration' }

export const signIn = (args) => <Auth registrationType="signin" {...args} />
export const signUp = (args) => <Auth registrationType="signup" {...args} />
