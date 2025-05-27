import { ReactElement, ReactNode, useCallback } from "react";
import {
  BulkDeleteWithUndoButton,
  Button,
  DatagridConfigurable,
  ExportButton,
  FilterButton,
  FunctionField,
  List,
  SearchInput,
  SelectColumnsButton,
  TopToolbar,
  useDataProvider,
  useListContext,
  useNotify,
  useRecordContext,
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
  BulkDeleteWithUndoButton;

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

const RestoreButton = ({ resource }: { resource: string }) => {
  const record = useRecordContext();
  const dataProvider = useDataProvider<ExtendedDataProvider>();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleRestore = useCallback(async () => {
    if (!record) return;

    try {
      await dataProvider.restoreOne(resource, { id: record.id });
      notify("Item restored successfully");
      refresh();
    } catch (error: any) {
      notify(`Error restoring: ${record?.id}`, { type: "error" });
    }
  }, [record, dataProvider, notify, refresh, resource]);
  if (!record) return null;

  return (
    <Button
      label="Restore"
      onClick={handleRestore}
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
        <FunctionField
          label="Actions"
          render={() => <RestoreButton resource={resource} />}
        />
      </DatagridConfigurable>
    </List>
  );
};
