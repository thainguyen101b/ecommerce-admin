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
import { InstructionAside } from "../../components/InstructionAside.tsx";

const NAME_REQUIRED = "Subcategory name is required.";
const NAME_MAX_LENGTH = "Subcategory name length must less than 255.";

export const SubcategoryEdit = () => {
  const instructions = [NAME_REQUIRED, NAME_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit subcategory: ${error.message}`, { type: "error" });
  };

  return (
    <Edit
      title="Subcategory Edit"
      aside={
        <InstructionAside
          title="Subcategory instructions"
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
