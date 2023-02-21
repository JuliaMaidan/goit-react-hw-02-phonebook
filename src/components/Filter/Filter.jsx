import styles from './filter.module.scss';
import PropTypes from 'prop-types';

export const Filter = ({onChange}) => {
    return (
        <>
            <label className={styles.label}>Find contacts by name or number</label>
            <input className={styles.filter} name="filter" onChange={onChange} type="text" />
        </>
    )
}

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
}