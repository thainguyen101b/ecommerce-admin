import {
  Create,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../components/InstructionAside";

const NAME_REQUIRED = "Category name is required.";
const NAME_MAX_LENGTH = "Category name length must less than 255.";

export const CategoryCreate = () => {
  const instructions = [NAME_REQUIRED, NAME_MAX_LENGTH];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create category: ${error.message}`);
  };

  return (
    <Create
      title="Category Creation"
      aside={
        <InstructionAside
          title="Category instruction"
          instructions={instructions}
        />
      }
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput
          source="name"
          validate={[required(NAME_REQUIRED), maxLength(255, NAME_MAX_LENGTH)]}
        />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
      </SimpleForm>
    </Create>
  );
};
