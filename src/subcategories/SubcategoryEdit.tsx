import { Box, Typography } from "@mui/material";
import {
  AutocompleteInput,
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

export const SubcategoryEdit = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit subcategory: ${error.message}`);
  };

  return (
    <Edit
      title="Subcategory Edit"
      aside={<Aside />}
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput
          source="name"
          validate={[required("Subcategory name is required")]}
        />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
        <ReferenceInput
          source="categoryId"
          reference="categories"
          label="Parent Category"
        >
          <AutocompleteInput
            optionText="name"
            helperText="Type to search category"
          />
        </ReferenceInput>

        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
