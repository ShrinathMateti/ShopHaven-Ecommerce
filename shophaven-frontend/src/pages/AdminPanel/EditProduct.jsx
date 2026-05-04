import React from 'react'
import {
  ArrayInput,
  BooleanInput,
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  FormDataConsumer
} from 'react-admin'
import { colorSelector } from '../../components/Filters/ColorsFilter'
import { sizeSelector } from './CreateProduct'

const EditProduct = () => {
  return (
    <Edit>
      <SimpleForm>

        <TextInput label="Name" source='name' />
        <TextInput label="Description" source='description' />
        <NumberInput label="Price" source='price' />
        <TextInput label="Brand" source='brand' />

       
        <TextInput source="thumbnail" label="Thumbnail URL" validate={[required()]} />

        <FormDataConsumer>
          {({ formData }) => (
            <img
              src={formData?.thumbnail || "https://placehold.co/100"}
              alt="thumbnail"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                marginTop: 10
              }}
              onError={(e) => {
                e.target.src = "https://placehold.co/100"
              }}
            />
          )}
        </FormDataConsumer>

        {/* Variants */}
        <ArrayInput source='variants' label='Edit Variants'>
          <SimpleFormIterator inline>
            <SelectInput source='color' choices={Object.keys(colorSelector)} resettable />
            <SelectInput source='size' choices={sizeSelector} />
            <NumberInput source='stockQuantity' />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Product Images */}
        <ArrayInput source='productResources'>
          <SimpleFormIterator inline>

            <TextInput source='name' validate={[required()]} />

            <TextInput source="url" label="Image URL" validate={[required()]} />

            <FormDataConsumer>
              {({ scopedFormData }) => (
                <img
                  src={scopedFormData?.url || "https://placehold.co/100"}
                  alt="product"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    marginTop: 5
                  }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/100"
                  }}
                />
              )}
            </FormDataConsumer>

            <SelectInput source='type' choices={["image"]} />
            <BooleanInput source='isPrimary' />

          </SimpleFormIterator>
        </ArrayInput>

      </SimpleForm>
    </Edit>
  )
}

export default EditProduct