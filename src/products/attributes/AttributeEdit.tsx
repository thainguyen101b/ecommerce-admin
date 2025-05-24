import { Box, Typography } from "@mui/material";
import {
  Edit,
  FormDataConsumer,
  RadioButtonGroupInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";
import { colors } from "../../common/colors";
import { sizes } from "../../common/sizes";

const Aside = () => (
  <Box sx={{ width: "200px", margin: "1em" }}>
    <Typography variant="h6">Instructions</Typography>
    <Typography variant="body2">foo</Typography>
  </Box>
);

export const AttributeEdit = () => {
  const notify = useNotify();
  const getValueChoices = (attributeType: string) => {
    if (attributeType === "COLOR") return colors;
    if (attributeType === "SIZE") return sizes;
    return [];
  };

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
          validate={[required()]}
          disabled
        />
        <FormDataConsumer>
          {({ formData }) =>
            formData.type && (
              <SelectInput
                source="value"
                label={`${formData.type} Value`}
                choices={getValueChoices(formData.type)}
                validate={[required()]}
                helperText={`Select a ${formData.type.toLowerCase()} option`}
              />
            )
          }
        </FormDataConsumer>

        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
