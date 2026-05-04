import React from "react";
import {
  ArrayInput,
  BooleanInput,
  Create,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  required,
  SelectField,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  FormDataConsumer,
} from "react-admin";
import CategoryTypeInput from "./Category/CategoryTypeInput";
import { colorSelector } from "../../components/Filters/ColorsFilter";

export const sizeSelector = ["S", "M", "L", "XL", "XXL"];

const CreateProduct = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="slug" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <NumberInput source="price" validate={[required()]} />
        <TextInput source="brand" validate={[required()]} />
        {/* Refer category fields */}
        <ReferenceInput source="categoryId" reference="category" />
        <CategoryTypeInput />

        <TextInput
          source="thumbnail"
          label="Thumbnail URL"
          validate={[required()]}
        />
        <FormDataConsumer>
          {({ formData }) => (
            <img
              src={formData?.thumbnail || "https://placehold.co/100"}
              alt="thumbnail"
              style={{
                width: 100,
                objectFit: "cover",
                marginTop: 10,
              }}
              onError={(e) => {
                e.target.src = "https://placehold.co/100";
              }}
            />
          )}
        </FormDataConsumer>
        <ArrayInput source="variants">
          <SimpleFormIterator inline>
            <SelectInput
              source="color"
              choices={Object.keys(colorSelector)}
              resettable
            />
            <SelectInput source="size" choices={sizeSelector} />
            <NumberInput source="stockQuantity" />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="productResources">
          <SimpleFormIterator inline>
            <TextInput source="name" validate={[required()]} />

            <TextInput source="url" label="Image URL" validate={[required()]} />
            <FormDataConsumer>
              {({ scopedFormData }) =>
                scopedFormData?.url ? (
                  <img
                    src={scopedFormData.url}
                    alt="product"
                    style={{ width: 100 }}
                  />
                ) : null
              }
            </FormDataConsumer>

            <SelectInput source="type" choices={["image"]} />
            <BooleanInput source="isPrimary" />
          </SimpleFormIterator>
        </ArrayInput>
        <NumberInput source="rating" />
        <BooleanInput source="isNewArrival" />
      </SimpleForm>
    </Create>
  );
};

export default CreateProduct;
