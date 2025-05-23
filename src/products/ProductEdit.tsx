import { Box, Typography } from "@mui/material";
import {
  Edit,
  ReferenceInput,
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

export const ProductEdit = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit product: ${error.message}`);
  };

  return (
    <Edit title="Product Edit" aside={<Aside />} mutationOptions={{ onError }}>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput
          source="name"
          validate={[required("Product name is required")]}
        />
        <TextInput source="summary" />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
        <ReferenceInput
          source="subcategoryId"
          reference="subcategories"
          label="Subcategory"
        />

        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
