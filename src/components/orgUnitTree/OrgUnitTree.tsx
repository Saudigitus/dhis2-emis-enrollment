import { useDataQuery } from '@dhis2/app-runtime'
import { CenteredContent, CircularLoader, Help } from "@dhis2/ui"
import React, { useState } from 'react'
import { useParams } from '../../hooks/commons/useQueryParams';
import { atom, useRecoilState } from "recoil"
import OrgUnitTreeComponent from './OrgUnitTreeComponent';
import { SearchOu } from '../../types/ouQueryParams/ouQueryParams';
import { OuQueryString } from '../../schema/headerSearchInputSchema';

export default function OrgUnitTree({ onToggle }: { onToggle: () => void }): React.ReactElement {
    const [selectedOu, setSelectedOu] = useState<{ id: string, displayName: string, selected: any }>()
    const [stringQuery, setStringQuery] = useRecoilState(OuQueryString);
    const [key, setKey] = React.useState<any>(undefined);
    const { add } = useParams();
    

    const onOuChange = (event: { id: string, displayName: string, selected: any, path: string }) => {
        setStringQuery(undefined)
        add("school", event?.id);
        add("schoolName", event?.displayName);
        setSelectedOu(event);
        onToggle()
    }

    const { loading, data, error } = useDataQuery<{ orgUnits: { organisationUnits: [{ id: string, displayName: string }] } }>(
        React.useMemo(
            () => ({
                orgUnits: {
                    resource: 'me',
                    params: {
                        fields: ['organisationUnits[id,path]'],
                    },

                },
            }),
            [],
        ),
    );

    const { loading: searchLoading, data: searchData, refetch: refetchOrg, error: searchError } = useDataQuery<{ orgUnits: { organisationUnits: [SearchOu] } }>(
        React.useMemo(
            () => ({
                orgUnits: {
                    resource: 'organisationUnits',
                    params: ({ variables: { stringQuery: currentSearchText } }) => ({
                        fields: [
                            'id,displayName,path,publicAccess,access,lastUpdated',
                            'children[id,displayName,publicAccess,access,path,children::isNotEmpty]',
                        ].join(','),
                        paging: false,
                        query: currentSearchText,
                        withinUserSearchHierarchy: true,
                        pageSize: 15,
                    }),

                },
            }),
            [],
        ),
        { lazy: true },
    );


    const ready = stringQuery?.length ? !searchLoading : !loading;

    React.useEffect(() => {
        // Define um temporizador (timeout) de 500 milissegundos
        const timeoutId = setTimeout(() => {
            // O código dentro deste bloco será executado após 500 milissegundos
            if (stringQuery?.length) {
                refetchOrg({ variables: { stringQuery } });
                setKey(`${stringQuery}-${new Date().getTime()}`);
            }
        }, 500);

        // Limpa o temporizador existente antes de definir um novo
        return () => clearTimeout(timeoutId);
    }, [refetchOrg, stringQuery]);

    if (error != null || searchError != null) {
        return <Help error>
            Something went wrong when loading the organisation units!
        </Help>
    }

    if (loading || searchLoading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    if (!searchData?.orgUnits?.organisationUnits.length && stringQuery) {
        return <Help>
            No organisation units found
        </Help>
    }

    const renderOrgUnitTree = () => {
        if (stringQuery?.length) {
            return (<OrgUnitTreeComponent
                roots={searchData?.orgUnits?.organisationUnits ?? []}
                onSelectClick={onOuChange}
                treeKey={key}
            />);
        }
        return (<OrgUnitTreeComponent
            roots={data?.orgUnits?.organisationUnits ?? []}
            onSelectClick={onOuChange}
            treeKey={'initial'}
            previousOrgUnitId={[]}
        />);
    };

    return (
        <>
            {renderOrgUnitTree()}
        </>
    )
}
