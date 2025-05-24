import { Box, Typography } from "@mui/material";
import {
  AutocompleteInput,
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

export const SubcategoryCreate = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create subcategory: ${error.message}`);
  };

  return (
    <Create
      title="Subcategory Creation"
      aside={<Aside />}
      mutationOptions={{ onError }}
    >
      <SimpleForm>
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
      </SimpleForm>
    </Create>
  );
};
