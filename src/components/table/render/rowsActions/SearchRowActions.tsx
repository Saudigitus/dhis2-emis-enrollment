import style from './rowActions.module.css'
import { IconButton, Tooltip } from '@material-ui/core';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';

export default function SearchRowActions(props: RowActionsProps) {
  const { row, rowsActions } = props;

  return (
    <div className={style.rowActionsContainer}>

      {rowsActions?.map((option: RowActionsType, i: number) => (
        <Tooltip
          key={i}
          title={option.label}
          disabled={option?.disabled}
          onClick={() => option.onClick(row)}
        >
          <IconButton className={style.rowActionsIcon}>{option.icon}</IconButton>
        </Tooltip>
      ))}

    </div>
  );
}
