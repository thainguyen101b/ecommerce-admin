import {
  AutocompleteInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../components/InstructionAside";

const NAME_MAX_LENGTH = "Product name length must less than 255.";
const NAME_REQUIRED = "Product name is required.";

export const ProductEdit = () => {
  const instructions: string[] = [NAME_REQUIRED, NAME_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit product: ${error.message}`, { type: "error" });
  };

  return (
    <Edit
      title="Product Edit"
      aside={
        <InstructionAside
          title="Product instructions"
          instructions={instructions}
        />
      }
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput
          source="name"
          validate={[required(NAME_REQUIRED), maxLength(255, NAME_MAX_LENGTH)]}
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
        >
          <AutocompleteInput
            optionText="name"
            helperText="Type to search subcategory"
          />
        </ReferenceInput>

        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
