import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextArea.module.scss';
import classNames from "classnames";

const TextArea = ({onChange, value, customClass}) => {
    return (
        <div  className={classNames(styles.container,
            {
                [customClass]: Boolean(customClass)
            }
        )}>
            <textarea onChange={onChange} value={value}/>
        </div>
    );
};

TextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default TextArea;
