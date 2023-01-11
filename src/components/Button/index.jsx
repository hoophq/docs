import React from 'react';
import styles from './styles.module.css';

export default function Button({children, onClick}) {
  return (
    <button
      className={styles.buttonBase}
      onClick={() => onClick ? onClick() : undefined}
    >
      {children}
    </button>
  )
}

