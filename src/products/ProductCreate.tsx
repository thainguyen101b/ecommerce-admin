import { Box, Typography } from "@mui/material";
import {
  Create,
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

export const ProductCreate = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create product: ${error.message}`);
  };

  return (
    <Create
      title="Product Creation"
      aside={<Aside />}
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput
          source="name"
          validate={[required("Product name is required")]}
        />
        <ReferenceInput
          source="subcategoryId"
          reference="subcategories"
          label="Subcategory"
        ></ReferenceInput>
        <TextInput source="summary" />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
      </SimpleForm>
    </Create>
  );
};
