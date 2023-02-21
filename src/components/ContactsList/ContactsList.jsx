import styles from "./ContactsList.module.scss";
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, onDelete }) => {
    const contact = contacts.map(({ id, name, number }) => (
      <li className={styles.contact} key={id}>{name}: {number}
        <button className={styles.btn} onClick={() => onDelete(id)}>Delete</button>
      </li>
    ))
    return (
        <ul className={styles.list}>
          {contact}
        </ul>
    )
}

ContactsList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }))
}