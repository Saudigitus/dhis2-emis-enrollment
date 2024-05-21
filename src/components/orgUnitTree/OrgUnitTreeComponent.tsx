import React from 'react'
import { OrganisationUnitTree, Help } from '@dhis2/ui';
import { usePreviousOrganizationUnit } from '../../hooks/organisationUnit/usePreviousOrganizationUnit';

type Props = {
    roots: Array<any>,
    classes?: {
        orgunitTree: string,
    },
    onSelectClick: Function,
    treeKey: string,
    previousOrgUnitId?: Object
};

const OrgUnitTreeComponent = (props: Props) => {

    const { roots, treeKey, previousOrgUnitId, onSelectClick } = props;
    const previousSelectedOrgUnit = usePreviousOrganizationUnit(previousOrgUnitId);
    const getExpandedItems = () => {
        if (roots && roots.length === 1) {
            return [`/${roots[0].id}`];
        } else if (roots?.length > 1) {
            return roots?.map(root => root?.path);
        }

        return undefined;
    };

    const getHighlightedItems = () => {
        if (previousSelectedOrgUnit?.path) {
            return [previousSelectedOrgUnit?.path];
        }
        return undefined;
    };

    const initiallyExpanded = getExpandedItems();

    const [expanded, setExpanded] = React.useState(initiallyExpanded);

    React.useEffect(() => {
        if (previousSelectedOrgUnit?.expandedPaths) {
            setExpanded(previousSelectedOrgUnit.expandedPaths);
        }
    }, [previousSelectedOrgUnit?.expandedPaths]);

    const handleExpand = ({ path }: { path: string }) => {
        if (expanded && !expanded.includes(path)) {
            setExpanded([...expanded, path]);
        }
    };

    const handleCollapse = ({ path }: { path: string }) => {
        const pathIndex = expanded?.indexOf(path);

        if (pathIndex && pathIndex !== -1 && expanded) {
            const updatedExpanded =
                pathIndex === 0
                    ? expanded.slice(1)
                    : [
                        ...expanded.slice(0, pathIndex),
                        ...expanded.slice(pathIndex + 1),
                    ];
            setExpanded(updatedExpanded);
        }
    };


    if (!roots) {
        return null;
    }

    if (roots.length === 0) {
        return <Help error>
            No organisation units to show!
        </Help>
    }

    return (
        <OrganisationUnitTree
            key={treeKey}
            roots={roots?.map(item => item?.id)}
            expanded={expanded}
            handleExpand={handleExpand}
            handleCollapse={handleCollapse}
            singleSelection
            selected={getHighlightedItems()}
            onChange={onSelectClick}
        />
    )
}

export default OrgUnitTreeComponent