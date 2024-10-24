import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { RowCell, RowTable } from '../components';
import RowActions from './rowsActions/RowActions';
import { RenderHeaderProps } from '../../../types/table/TableContentProps';
import { useRecoilValue } from 'recoil';
import CropOriginal from '@material-ui/icons/CropOriginal';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { getDisplayName } from '../../../utils/table/rows/getDisplayNameByOption';
import { formatKeyValueTypeHeader } from '../../../utils/programRules/formatKeyValueType';
import { Attribute } from '../../../types/generated/models';
import { GetImageUrl } from '../../../utils/table/rows/getImageUrl';
import { IconButton } from '@material-ui/core';
import { ProgramConfigState } from '../../../schema/programSchema';
import { checkCanceled, checkOwnershipOu } from '../../../utils/table/rows/checkCanceled';
import SearchRowActions from './rowsActions/SearchRowActions';
import EnrollmentDetailsCards from './enrollmentDetailsComponent/EnrollmentDetailsComponent';
import { checkEnrolledAcademicYear } from '../../../utils/table/rows/checkEnrolledAcademicYear';
import { useParams } from '../../../hooks';
import { getDataStoreKeys } from '../../../utils/commons/dataStore/getDataStoreKeys';
import useViewportWidth from '../../../hooks/rwd/useViewportWidth';
import MobileRow from '../components/mobileRow/MobileRow';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        historyRow: { backgroundColor: "#FFFF" },
        dataRow: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#F1FBFF'
            }
        },
        dataRowCollapsed: {
            backgroundColor: '#F1FBFF'
        },
        cell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: theme.spacing(1) * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)",
            [theme.breakpoints.down('md')]: {
                padding: `{theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
            },
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary,
            [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.pxToRem(12),
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(11),
            }
        },
        actionsCell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) / 2}px ${theme.spacing(1 + 0.25)}px`,
            [theme.breakpoints.down('md')]: {
                padding: `${theme.spacing(1)}px`,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(1)}px`,
            }
        }
    })
);

function RenderRows(props: RenderHeaderProps): React.ReactElement {
    const classes = useStyles()
    const { imageUrl } = GetImageUrl()
    const { urlParamiters } = useParams()
    const { academicYear, school, sectionType } = urlParamiters()
    const { viewPortWidth } = useViewportWidth()

    const { registration } = getDataStoreKeys()
    const programConfigState = useRecoilValue(ProgramConfigState);
    const { headerData, rowsData, searchActions, onSelectTei, loading } = props;
    const [showEnrollments, setShowEnrollments] = useState<string>();

    if (rowsData?.length === 0 && !loading) {
        return (
            <RowTable
                className={classes.row}
            >
                <RowCell
                    className={classNames(classes.cell, classes.bodyCell)}
                    colspan={headerData?.filter(x => x.visible)?.length as unknown as number + 1}
                >
                    {i18n.t('No data to display')}
                </RowCell>
            </RowTable>
        );
    }

    return (
        <React.Fragment>
            {
                rowsData?.map((row, index) => (
                    <>
                        {viewPortWidth > 520 ?
                            <RowTable
                                key={index}
                                inactive={checkCanceled(row.status)}
                                isOwnershipOu={checkOwnershipOu(row.ownershipOu, school as unknown as string)}
                                className={classNames(classes.row, classes.dataRow, (searchActions && row.trackedEntity === showEnrollments) ? classes.dataRowCollapsed : null)}
                            >
                                {
                                    headerData?.filter(x => x.visible)?.map(column => (
                                        <RowCell
                                            key={column.id}
                                            className={classNames(classes.cell, classes.bodyCell, (column.displayName == "Actions") ? classes.actionsCell : null)}
                                        >
                                            <div>
                                                {
                                                    formatKeyValueTypeHeader(headerData)[column.id] === Attribute.valueType.IMAGE ?
                                                        <a href={imageUrl({ attribute: column.id, trackedEntity: row.trackedEntity })} target='_blank'>{row[column.id] && <IconButton> <CropOriginal /></IconButton>}</a>
                                                        :
                                                        getDisplayName({ metaData: column.id, value: row[column.id], program: programConfigState })
                                                }
                                                {
                                                    (column.displayName == "Actions") ?
                                                        searchActions ? <SearchRowActions row={row} onSelectTei={onSelectTei ? () => onSelectTei(row) : undefined} onShowHistory={() => setShowEnrollments(showEnrollments === row.trackedEntity ? "" : row.trackedEntity)} /> :
                                                            <RowActions row={row} />
                                                        : null
                                                }
                                            </div>
                                        </RowCell>
                                    ))
                                }
                            </RowTable>
                            :
                            <MobileRow
                                row={row}
                                header={headerData}
                                inactive={checkCanceled(row.status)}
                                isOwnershipOu={checkOwnershipOu(row.ownershipOu, school as unknown as string)}
                                actions={
                                    searchActions ?
                                        <SearchRowActions row={row} onSelectTei={onSelectTei ? () => onSelectTei(row) : undefined} onShowHistory={() => setShowEnrollments(showEnrollments === row.trackedEntity ? "" : row.trackedEntity)} /> :
                                        <RowActions row={row} />
                                }
                            />
                        }

                        {searchActions && showEnrollments === row.trackedEntity ?
                            <RowTable className={classNames(classes.row, classes.historyRow)}>
                                <RowCell
                                    className={classNames(classes.cell, classes.bodyCell)}
                                    colspan={headerData?.filter(x => x.visible)?.length as unknown as number + 1}
                                >
                                    <EnrollmentDetailsCards existingAcademicYear={checkEnrolledAcademicYear(row?.registrationEvents, academicYear as unknown as string, registration.academicYear, school!, sectionType!)} onSelectTei={onSelectTei ? () => onSelectTei(row) : undefined} enrollmentsData={row.registrationEvents} />
                                </RowCell>
                            </RowTable>
                            : null
                        }
                    </>

                ))
            }
        </React.Fragment>
    )
}

export default RenderRows
