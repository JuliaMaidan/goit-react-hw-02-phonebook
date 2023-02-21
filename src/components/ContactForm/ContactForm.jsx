import { Component } from "react"
import styles from "./ContactForm.module.scss"
import PropTypes from 'prop-types';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = (e) => {
        const { name, value } = e.target
        
        this.setState({
        [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { onSubmit } = this.props
        onSubmit({...this.state})
        e.target.reset();
    }
    
    render() {
        return(
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <label className={styles.label}>Name</label>
                <input
                    className={styles.field}
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                <label className={styles.label}>Number</label>
                <input
                    className={styles.field}
                    type="tel"
                    name="number"
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <button className={styles.btn} type='submit'>Add contact</button>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}