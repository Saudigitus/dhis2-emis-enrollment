import React from "react";
import { Card } from "@dhis2/ui";
import classNames from "classnames";
import { useRecoilValue } from "recoil";
import style from "./mobileRow.module.css";
import { RowTable } from "../../components";
import CropOriginal from '@material-ui/icons/CropOriginal';
import { Attribute } from "../../../../types/generated/models";
import { ProgramConfigState } from "../../../../schema/programSchema";
import { GetImageUrl } from "../../../../utils/table/rows/getImageUrl";
import { getDisplayName } from "../../../../utils/table/rows/getDisplayNameByOption";
import { formatKeyValueTypeHeader } from "../../../../utils/programRules/formatKeyValueType";
import useGetSectionTypeLabel from "../../../../hooks/commons/useGetSectionTypeLabel";

export default function MobileRow(props: any): React.ReactElement {
  const { imageUrl } = GetImageUrl()
  const { sectionName } = useGetSectionTypeLabel()
  const { row, header, actions, isOwnershipOu, inactive } = props;
  const programConfigState = useRecoilValue(ProgramConfigState);


  return (
    <Card
      className={classNames(style.cardContainer)}
    >
      <div>
        <div className={style.cardActions}>
          <span className={style.cardMessage}>
            {!isOwnershipOu ? 'This ' + sectionName.toLocaleLowerCase() + ' was transferred to another school' : inactive ? 'This ' + sectionName + ' enrollment is inactive' : ""}
          </span>
          {actions}
        </div>
        {/* <Divider /> */}
        <div className={style.cardBody}>
          {
            header?.filter((x: any) => x.visible && x.displayName != "Actions")?.map((column: any) => (
              <RowTable className={classNames(style.row)}>
                <td className={classNames(style.cell, style.headerCell)}>
                  {column.displayName}
                </td>
                <td className={classNames(style.cell, style.bodyCell)}>
                  {
                    formatKeyValueTypeHeader(header)[column.id] === Attribute.valueType.IMAGE ?
                      <a href={imageUrl({ attribute: column.id, trackedEntity: row.trackedEntity })} target='_blank'>{row[column.id] && <CropOriginal />}</a>
                      :
                      getDisplayName({ metaData: column.id, value: row[column.id], program: programConfigState })
                  }
                </td>
              </RowTable>
            ))
          }
        </div>
      </div>
    </Card>
  );
}
