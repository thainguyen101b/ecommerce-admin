import {
  Create,
  maxLength,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../../components/InstructionAside";

const VALUE_REQUIRED = "Product attribute value is required.";
const TYPE_REQUIRED = "Product attribute type is required.";
const VALUE_MAX_LENGTH = "Product attribute value length must less than 255.";

export const ProductAttributeCreate = () => {
  const instructions = [VALUE_REQUIRED, TYPE_REQUIRED, VALUE_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create product attribute: ${error.message}`);
  };

  return (
    <Create
      title="Attribute Creation"
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
          validate={[required(TYPE_REQUIRED)]}
        />
        <TextInput
          source="value"
          validate={[
            required(VALUE_REQUIRED),
            maxLength(255, VALUE_MAX_LENGTH),
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
