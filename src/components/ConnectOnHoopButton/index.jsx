import React from 'react';
import styles from './styles.module.css';
import Button from './../Button';

export default function ConnectOnHoopButton({url, text}) {
  const imgSource = "https://app.hoop.dev/images/hoop-branding/SVG/hoop-symbol_white.svg"
  return (
    <Button
      onClick={() => window.open(url, "_blank")}
    >
      <div className={styles.connectOnHoopButton__container}>
        <b>{text ? text : "Quickstart with this"}</b>
        <img
          className={styles.connectOnHoopButton__logo}
          src={imgSource}
        />
      </div>
    </Button>
  )
}
