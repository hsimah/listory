/* eslint-disable react/no-multi-comp */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import React from 'react';
import { useMutation } from 'react-apollo';
import * as Yup from 'yup';
import { withFormik } from 'formik';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is mandatory'),
  type: Yup.string().required('Type is mandatory'),
});

const ADD_LIST = gql`
mutation AddList($name: String!, $type: ListType!) {
  addList(name: $name, type: $type) {
    id
    name
    type
  }
}
`;

const GET_LISTS = gql`
query Lists {
  lists {
    name
    type
    id
  }
}
`;

function ListForm(props) {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;

  return <form onSubmit={handleSubmit}>
    <Paper>
      <div>
        <FormControl component='fieldset'>
          <TextField label="Name" id="name" value={values.name} onChange={handleChange} />
        </FormControl>
      </div>
      <div>
        <FormControl component='fieldset'>
          <FormLabel>{'Type'}</FormLabel>
          <Select
              id="type"
              name="type"
              value={values.type}
              onChange={handleChange}
          >
            <MenuItem value={'MASTER'} name='type'>Master</MenuItem>
            <MenuItem value={'SUB'} name='type'>Sub</MenuItem>
            <MenuItem value={'TRANSIENT'} name='type'>Transient</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
            variant='contained'
            color='secondary'
            onClick={handleSubmit}
            type='submit'
        >
          {'Test Your Knowledge'}
        </Button>
      </div>
    </Paper>
  </form>;
}

function List(props) {
  const [
    addList,
    { loading, error },
  ] = useMutation(ADD_LIST,{
    update(cache, { data: { addList } }) {
      const { lists } = cache.readQuery({ query: GET_LISTS });
      cache.writeQuery({
        query: GET_LISTS,
        data: { lists: lists.concat([addList]) },
      });
    },
  });

  const formikEnhancer = withFormik({
    validationSchema,
    handleSubmit: (payload, { setSubmitting }) => {
      addList({
        variables: {
          ...payload,
        },
      });
      setSubmitting(false);
    },
    displayName: 'Add List',
  });

  const ListFormik = formikEnhancer(ListForm);

  return <ListFormik type='' name='' />;
}



export default List;