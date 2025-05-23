import { Box, Typography } from "@mui/material";
import { Edit, SimpleForm, TextInput, required, useNotify } from "react-admin";

const Aside = () => (
  <Box sx={{ width: "200px", margin: "1em" }}>
    <Typography variant="h6">Instructions</Typography>
    <Typography variant="body2">foo</Typography>
  </Box>
);

export const CategoryEdit = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit category: ${error.message}`);
  };

  return (
    <Edit title="Category Edit" aside={<Aside />} mutationOptions={{ onError }}>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput
          source="name"
          validate={[required("Category name is required")]}
        />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
