import { Datagrid, List,TextField,ImageField} from "react-admin"


const ProductList = () => {
  return (
    <List>
      <Datagrid>
          <TextField disabled source="id" />
          <TextField source="name" />
          <ImageField source="thumbnail" />
          <TextField source="brand" />
          <TextField source="description" />
          <TextField source="price" />
          <TextField source="slug" />
      </Datagrid>
    </List>
    
  )
}

export default ProductList