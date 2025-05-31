import { ReactElement, ReactNode, useCallback } from "react";
import {
  Button,
  Show,
  TopToolbar,
  useDataProvider,
  useNotify,
  useRecordContext,
  useRefresh,
  useRedirect,
} from "react-admin";
import RestoreIcon from "@mui/icons-material/Restore";
import { ExtendedDataProvider } from "../dataProvider";

const RestoreButton = ({ resource }: { resource: string }) => {
  const record = useRecordContext();
  const dataProvider = useDataProvider<ExtendedDataProvider>();
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const handleRestore = useCallback(async () => {
    if (!record) return;

    try {
      await dataProvider.restoreOne(resource, { id: record.id });
      notify("Item restored successfully");

      // Redirect về list page sau khi restore thành công
      const baseResource = resource.replace("/inactive", "");
      redirect("list", baseResource);
    } catch (error: any) {
      notify(`Error restoring item: ${error.message}`, { type: "error" });
    }
  }, [record, dataProvider, notify, refresh, redirect, resource]);

  if (!record) return null;

  return (
    <Button
      label="Restore"
      onClick={handleRestore}
      startIcon={<RestoreIcon />}
      color="primary"
      variant="contained"
    />
  );
};

const InactiveShowActions = ({ resource }: { resource: string }) => (
  <TopToolbar>
    <RestoreButton resource={resource} />
  </TopToolbar>
);

interface InactiveShowProps {
  resource: string;
  title?: string | ReactElement;
  children: ReactNode;
  actions?: ReactElement;
}

export const InactiveShow = ({
  resource,
  title,
  children,
  actions = <InactiveShowActions resource={resource} />,
}: InactiveShowProps) => {
  return (
    <Show resource={resource} title={title} actions={actions}>
      {children}
    </Show>
  );
};
