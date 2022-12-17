import React, { ReactElement, useState } from "react";
import styles from "./styles/Foldable.module.css";

const Foldable = (props: {
  defaultOpen?: boolean;
  openText?: string;
  closedText?: string;
  children: ReactElement;
}) => {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  return (
    <>
      <div className={styles.main}>
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? props.openText : props.closedText}
        </button>
      </div>
      <div style={open ? {} : { display: "none" }}>{props.children}</div>
    </>
  );
};

export default Foldable;
