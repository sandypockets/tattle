import React from 'react'
import Navigation from "../components/Layout/Navigation";

export default { title: 'Nav' }

export const navigation = (args) => <Navigation currentUrl={'/'} {...args} />
export const secondaryHighlight = (args) => <Navigation currentUrl={'/team'} {...args} />