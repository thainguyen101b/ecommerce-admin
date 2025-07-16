import { ReactElement, ReactNode, useCallback } from "react";
import {
  Button,
  DatagridConfigurable,
  ExportButton,
  FilterButton,
  List,
  SearchInput,
  SelectColumnsButton,
  TopToolbar,
  useDataProvider,
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
} from "react-admin";
import RestoreIcon from "@mui/icons-material/Restore";
import { ExtendedDataProvider } from "../dataProvider";

const BulkRestoreButton = ({ resource }: { resource: string }) => {
  const { selectedIds } = useListContext();
  const dataProvider = useDataProvider<ExtendedDataProvider>();
  const notify = useNotify();
  const refresh = useRefresh();
  const unselectAll = useUnselectAll();

  const handleRestoreMany = useCallback(async () => {
    try {
      await dataProvider.restoreMany(resource, { ids: selectedIds });
      notify(`${selectedIds.length} items restored successfully`);
      unselectAll();
      refresh();
    } catch (error: any) {
      notify(`Error restoring items: ${error.message}`, { type: "error" });
    }
  }, [dataProvider, selectedIds, notify, refresh, unselectAll, resource]);

  return (
    <Button
      label="Restore"
      onClick={handleRestoreMany}
      startIcon={<RestoreIcon />}
      color="primary"
    />
  );
};

const InactiveListActions = ({ resource }: { resource: string }) => {
  const { selectedIds } = useListContext();

  return (
    <TopToolbar>
      <SelectColumnsButton />
      <FilterButton />
      <ExportButton />
      {selectedIds && selectedIds.length > 0 && (
        <BulkRestoreButton resource={resource} />
      )}
    </TopToolbar>
  );
};

interface InactiveListProps {
  resource: string;
  title?: string;
  filters?: ReactElement[];
  children: ReactNode;
}

export const InactiveList = ({
  resource,
  title = resource,
  filters = [<SearchInput source="q" alwaysOn key="search" />],
  children,
}: InactiveListProps) => {
  return (
    <List
      resource={resource}
      title={title}
      actions={<InactiveListActions resource={resource} />}
      filters={filters}
    >
      <DatagridConfigurable
        bulkActionButtons={<BulkRestoreButton resource={resource} />}
      >
        {children}
      </DatagridConfigurable>
    </List>
  );
};
