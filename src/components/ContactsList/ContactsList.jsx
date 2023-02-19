import styles from "./ContactsList.module.scss"

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