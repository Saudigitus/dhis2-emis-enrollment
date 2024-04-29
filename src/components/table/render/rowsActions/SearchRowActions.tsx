import style from './rowActions.module.css'
import { IconButton, Tooltip } from '@material-ui/core';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';
import classNames from 'classnames';
import {IconCheckmarkCircle24, IconInfo24 } from "@dhis2/ui";
import { CheckBoxOutlined } from '@material-ui/icons';

export default function SearchRowActions(props: RowActionsProps) {
  const { row, onSelectTei, onShowHistory } = props;

  const rowsActions: RowActionsType[] = [
    /* {
      icon: <CheckBoxOutlined />,
      label: `Select for new enrollment`,
      disabled: false,
      onClick: (tei) => { onSelectTei ? () => onSelectTei(row) : undefined  },
    }, */
    {
      icon: <IconInfo24 />,
      label: `View history`,
      disabled: false,
      onClick: () => { onShowHistory() },
    }
  ];

  return (
    <div className={style.rowActionsContainer}>

      {rowsActions?.map((option: RowActionsType, i: number) => (
        <Tooltip
          key={i}
          title={option.label}
          disabled={option?.disabled}
          onClick={() => option.onClick(row)}
        >
          <IconButton className={classNames(style.rowSearchActionsIcon, style[`icon${i}`])}>{option.icon}</IconButton>
        </Tooltip>
      ))}

    </div>
  );
}
