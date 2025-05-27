import { Create, SimpleForm, TextInput } from "react-admin";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";

export const CategoryCreate = () => {
  const mutationOptions = useEnhancedMutationOptions({
    defaultErrorMessage: "Could not create category",
  });

  return (
    <Create title="Category Creation" mutationOptions={mutationOptions}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
      </SimpleForm>
    </Create>
  );
};
