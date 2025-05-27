import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../../components/InstructionAside.tsx";

const NAME_MAX_LENGTH = "Product name length must less than 255.";
const NAME_REQUIRED = "Product name is required.";

export const ProductCreate = () => {
  const instructions: string[] = [NAME_REQUIRED, NAME_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create product: ${error.message}`, { type: "error" });
  };

  return (
    <Create
      title="Product Creation"
      aside={
        <InstructionAside
          title="Product instructions"
          instructions={instructions}
        />
      }
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput
          source="name"
          validate={[required(NAME_REQUIRED), maxLength(225, NAME_MAX_LENGTH)]}
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
