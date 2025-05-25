import {
  Edit,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../components/InstructionAside";

const NAME_REQUIRED = "Category name is required.";
const NAME_MAX_LENGTH = "Category name length must less than 255.";

export const CategoryEdit = () => {
  const instructions = [NAME_REQUIRED, NAME_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not edit category: ${error.message}`);
  };

  return (
    <Edit
      title="Category Edit"
      aside={
        <InstructionAside
          title="Category instructions"
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
        <TextInput disabled label="Created At" source="createdAt" />
        <TextInput disabled label="Updated At" source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};
