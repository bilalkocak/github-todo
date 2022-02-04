import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import classNames from 'classnames';

function Button({text, onClick, icon, customClass, ...props}) {
    return (
        <div
            onClick={onClick}
            className={classNames(styles.container,
                {
                    [customClass]: Boolean(customClass)
                }
            )}
            {...props}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {text}
        </div>);
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    customClass: PropTypes.string
};

export default Button;
