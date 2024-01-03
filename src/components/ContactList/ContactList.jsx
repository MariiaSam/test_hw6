import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'store/Contacts/contactsSelector';
import { selectFilter } from 'store/Filter/filterSelector';

import { deleteContact } from 'store/Contacts/contactsSlice';

import {
  ContactWrap,
  ContactListItem,
  ContactListBtn,
  Span,
} from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().trim().includes(normalizedFilter) ||
      number.trim().includes(normalizedFilter)
  );

  const onDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ContactWrap>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <ContactListItem key={id}>
            <Span>{name}:</Span>
            <Span>{number}</Span>

            <ContactListBtn type="button" onClick={() => onDelete(id)}>
              Delete
            </ContactListBtn>
          </ContactListItem>
        );
      })}
    </ContactWrap>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};

// export const ContactList = ({ contacts, onDelete }) => {
//   return (
//     <ContactWrap>
//       {contacts.map(({ id, name, number }) => {
//         return (
//           <ContactListItem key={id}>
//             <Span>{name}:</Span>
//             <Span>{number}</Span>

//             <ContactListBtn type="button" onClick={() => onDelete(id)}>
//               Delete
//             </ContactListBtn>
//           </ContactListItem>
//         );
//       })}
//     </ContactWrap>
//   );
// };
