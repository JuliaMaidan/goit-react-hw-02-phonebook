import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './App.module.scss';

import PropTypes from 'prop-types';

export class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  } 

  onAddContact = ({ name, number }) => {
    if (this.isDuplicate({ name, number })) {
      return Notify.failure(`Contact with this name: ${name} and number: ${number} is already exist`);
    }
    this.setState(prevState => {
      const { contacts } = prevState
      const newContact = {
        id: nanoid(),
        name,
        number
      }
      return { contacts: [...contacts, newContact] }

    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  isDuplicate({name, number}) {
    const { contacts } = this.state;
        const duplicate = contacts.find(contact => {
            return (contact.name.toLowerCase() === name.toLowerCase() && contact.number.toLowerCase() === number.toLowerCase())
        });

        return Boolean(duplicate);
    }

  onDelete = (id) => {
    this.setState(prevState => {
      const upgradedList = prevState.contacts.filter(contact => contact.id !== id)
      
      return {
        contacts: upgradedList
      }
    })
  }

  getFiltered() {
    const { filter, contacts } = this.state
    if (!filter) {
      return contacts
    }
    const filtered = contacts.filter(({ name, number }) => {
      return (name.toLowerCase().includes(filter.toLowerCase()) || number.includes(filter))
    })
    return filtered
  }

  render() {
    const contacts = this.getFiltered()

    return (
      <div className={styles.box}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.onAddContact} />
        <h2>Contacts</h2>
        <label className={styles.label}>Find contacts by name or number</label>
        <input className={styles.filter} name="filter" onChange={this.handleChange} type="text" />
        <ContactsList contacts={contacts} onDelete={this.onDelete} />
      </div>
  );
  }
};

App.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })).isRequired,
    filter: PropTypes.string.isRequired,
  }