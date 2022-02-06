import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.scss'
import Delete from "../../assets/images/delete.png"
import Detail from "../../assets/images/detail.png"

const TodoItem = ({todo, order, onClickDetail, onClickDelete}) => {
    return (
        <div className={styles.container}>
           <div className={styles.content}>
               <div className={styles.order}>{order}</div>
                <div className={styles.text}>{todo.desc} ({todo?.sub_task?.length})</div>
           </div>
            <div className={styles.buttons}>
                <span className={styles.detail} onClick={() => onClickDetail(todo)}>
                    <img src={Detail} alt="detail"/>
                </span>
                <span className={styles.detail} onClick={() => onClickDelete(todo)}>
                    <img src={Delete} alt="delete"/>
                </span>
            </div>
        </div>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    onClickDetail: PropTypes.func.isRequired
};

export default TodoItem;
