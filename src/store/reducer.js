import { combineReducers } from '@reduxjs/toolkit'

import { contactsReducer } from './Contacts/contactsSlice'
import { filterReducer } from './Filter/filterSlice'

export const reducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer
})

