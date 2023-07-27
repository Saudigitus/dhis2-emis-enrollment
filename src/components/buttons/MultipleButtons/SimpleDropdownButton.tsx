import React, { useState } from "react";
import styles from "../button.module.css";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { type SimpleButtonsProps } from "../../../types/Buttons/SimpleButtonsProps";

interface ButtonProps {
  items: SimpleButtonsProps[]
  selectedTerm: any
  setSelectedTerm: (arg: object) => void
}

export default function SimpleDropdownButton(props: ButtonProps): React.ReactElement {
  const { items, selectedTerm, setSelectedTerm } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={styles.simpleDropdownButton}
        variant="outlined"
        onClick={handleClick}
        endIcon={anchorEl === null ? <ExpandMore className={styles.dropdownIcon}/> : <ExpandLess className={styles.dropdownIcon}/>}
      >
        {selectedTerm.label ?? "Terms"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          style: { boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }
         }}
      >
        {items.map((item, i) => (
          <MenuItem
            key={i}
            className={selectedTerm.id === item.id && styles.activeMenuItem}
            style={{ minWidth: 127 }}
            onClick={() => { setSelectedTerm(item); setAnchorEl(null); }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>{" "}
    </>
  );
}
