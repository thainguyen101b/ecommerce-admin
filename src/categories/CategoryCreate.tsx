import { Box, Typography } from "@mui/material";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useNotify,
} from "react-admin";

const Aside = () => (
  <Box sx={{ width: "200px", margin: "1em" }}>
    <Typography variant="h6">Instructions</Typography>
    <Typography variant="body2">foo</Typography>
  </Box>
);

export const CategoryCreate = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create category: ${error.message}`);
  };

  return (
    <Create
      title="Category Creation"
      aside={<Aside />}
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput
          source="name"
          validate={[required("Category name is required")]}
        />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
      </SimpleForm>
    </Create>
  );
};
