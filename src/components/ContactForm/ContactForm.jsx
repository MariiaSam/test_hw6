import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'store/Contacts/contactsSelector';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'store/Contacts/contactsSlice';
import { FormStyled, FieldStyled, Message, Label, Button } from './ContactForm.styled';

const schema = object().shape({
  name: string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name format')
    .required('This field is required'),
  number: string()
    .trim()
    .matches(
      /^[^a-zA-Z]*\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}[^a-zA-Z]*$/,
      'Invalid phone number format'
    )
    .required('This field is required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const addNewContact = ({ name, number }) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert('Phonebook already has this values');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        addNewContact(values);
        resetForm();
      }}
    >
      <FormStyled>
        <div>
          <Label htmlFor="name">Please, enter name</Label>
          <Field
            as={FieldStyled}
            type="text"
            name="name"
            placeholder=" "
            onChange={(e) => e.preventDefault()}
          />
          <ErrorMessage name="name" component={Message} />
        </div>
        <div>
          <Label htmlFor="number">Please, enter number</Label>
          <Field
            as={FieldStyled}
            type="text"
            name="number"
            placeholder=" "
            onChange={(e) => e.preventDefault()}
          />
          <ErrorMessage name="number" component={Message} />
        </div>
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};


// export const ContactForm = ({ onAddContact }) => {
//     return (
//       <Formik
//         initialValues={{
//           name: '',
//           number: '',
//         }}
//         validationSchema={schema}
//         onSubmit={(values, { resetForm }) => {
//           onAddContact({...values});
//           resetForm();
//         }}
//       >
//         <FormStyled>
//           <div>
//             <Label htmlFor="name">Please, enter name</Label>
  
//             <FieldStyled type="text" name="name" placeholder=" " />
//             <Message name="name" component="div"></Message>
//           </div>
//           <div>
//             <Label htmlFor="name">Please, enter number</Label>
  
//             <FieldStyled type="text" name="number" placeholder=" " />
//             <Message name="number" component="div"></Message>
//           </div>
//           <Button type="submit">Add contact</Button>
//         </FormStyled>
//       </Formik>
//     );
//   };