import {
  Edit,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../../../components/InstructionAside.tsx";

const VALUE_REQUIRED = "Product attribute value is required.";
const VALUE_MAX_LENGTH = "Product attribute value length must less than 255.";

export const ProductAttributeEdit = () => {
  const instructions = [VALUE_REQUIRED, VALUE_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit product attribute: ${error.message}`, {
      type: "error",
    });
  };

  return (
    <Edit
      title="Product Attribute Edit"
      aside={
        <InstructionAside
          title="Product attribute instructions"
          instructions={instructions}
        />
      }
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
        <TextInput source="value" validate={[required(VALUE_REQUIRED)]} />

        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
