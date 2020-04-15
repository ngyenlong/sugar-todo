import React, {useState, useEffect} from 'react';

function CreateForm(props) {
  const {submit, ...other} = props;
  const [value, setValue] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    submit && submit(value);
    setValue('')
  }
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit} {...other} >
      <input className="__input" style={{ marginRight: '5px'}} placeholder="New To-Do List" value={value}  onChange={event => setValue(event.target.value)}  />
      <button className="__btn" type="submit">Create</button>
    </form>
  );
}
export default CreateForm;
