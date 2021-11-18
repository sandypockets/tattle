import React from 'react'
import MagicLinkAuth from "../components/Auth/MagicLinkAuth";

export default { title: 'Registration' }

export const signIn = (args) => <MagicLinkAuth registrationType="signin" {...args} />
export const signUp = (args) => <MagicLinkAuth registrationType="signup" {...args} />
