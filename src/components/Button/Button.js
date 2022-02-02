import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
function Button({ text, onClick, icon, ...props }) {
    return (
        <div
            onClick={onClick}
            className={styles.container}
            {...props}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {text}
        </div>);
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;
