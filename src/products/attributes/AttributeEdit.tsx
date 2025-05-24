import { Box, Typography } from "@mui/material";
import {
  Edit,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";

const Aside = () => (
  <Box sx={{ width: "200px", margin: "1em" }}>
    <Typography variant="h6">Instructions</Typography>
    <Typography variant="body2">foo</Typography>
  </Box>
);

export const AttributeEdit = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit product attribute: ${error.message}`);
  };

  return (
    <Edit
      title="Attribute Edit"
      aside={<Aside />}
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <RadioButtonGroupInput
          source="type"
          choices={[
            { id: "COLOR", name: "Color" },
            { id: "SIZE", name: "Size" },
          ]}
          disabled
        />
        <TextInput
          source="value"
          validate={[required("Product attribute value is required")]}
        />

        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
