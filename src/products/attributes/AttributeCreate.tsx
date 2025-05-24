import { Box, Typography } from "@mui/material";
import {
  Create,
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

export const AttributeCreate = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create product attribute: ${error.message}`);
  };

  return (
    <Create
      title="Attribute Creation"
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
          validate={[required("Product attribute type is required")]}
        />
        <TextInput
          source="value"
          validate={[required("Product attribute value is required")]}
        />
      </SimpleForm>
    </Create>
  );
};
