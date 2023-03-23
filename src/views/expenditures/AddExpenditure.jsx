/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// api
import { addExpenditure } from '../../api/expenditure';

function TextInput({
  handleChange,
  label,
  name,
  value,
}) {
  return (
    <div className="mt-3">
      <label className="form-label" htmlFor={`expenditure-${name}`}>
        {label}
      </label>
      <input
        className="form-control"
        id={`expenditure-${name}`}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, name)}
      />
    </div>
  );
}

function Select({
  handleChange,
  label,
  name,
  value,
  options = [],
}) {
  return (
    <div className="mt-3">
      <label className="form-label" htmlFor={`expenditure-${name}`}>
        {label}
      </label>
      <select
        className="form-select"
        id={`expenditure-${name}`}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, name)}
      >
        {options.map(option => (
          <option value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DateInput({
  handleChange,
  label,
  name,
  value,
}) {
  return (
    <div className="mt-3">
      <label className="form-label" htmlFor={`expenditure-${name}`}>
        {label}
      </label>
      <input
        type="date"
        className="form-control"
        id={`expenditure-${name}`}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, name)}
      />
    </div>
  );
}

function AddButton() {
  const { addForm } = useSelector(store => store.expenditure);
  const [ loading, setLoading ] = useState(false);

  function handleAdd() {
    setLoading(true);
    addExpenditure(addForm)
      .then(data => {
        console.log(data);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAdd}
        disabled={loading}
      >
        Add Expenditure
      </button>
    </div>
  );
}

function AddExpense() {
  const dispatch = useDispatch();
  const {
    expenditure: {
      addForm = {},
      categories = [],
      beneficiaries = [],
    },
    user: { firstName },
  } = useSelector(store => store);

  function handleChange(event, name) {
    const { value } = event.target;
    dispatch({ type: 'UPDATE_EXPENDITURE_FORM', payload: { [name]: value } });
  }

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));
  categoryOptions.unshift({ value: '', label: 'Select', disabled: true });

  const beneficiaryOptions = beneficiaries.map(b => ({ value: b.id, label: b.name }));
  // set current user as the default option for beneficiary
  const currentUserIndex = beneficiaryOptions.findIndex(b => b.label.includes(firstName));
  const [ currentUser ] = beneficiaryOptions.splice(currentUserIndex, 1);
  beneficiaryOptions.unshift(currentUser);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Select
            label="Category"
            options={categoryOptions}
            name="category"
            handleChange={handleChange}
            value={addForm.category || ''}
          />
          <Select
            label="Who is it for?"
            options={beneficiaryOptions}
            name="beneficiary"
            handleChange={handleChange}
            value={addForm.beneficiary}
          />
          <DateInput
            label="Expenditure date"
            name="date"
            value={addForm.date}
            handleChange={handleChange}
          />
          <TextInput
            label="Cost"
            name="cost"
            value={addForm.cost}
            handleChange={handleChange}
          />
          <TextInput
            label="Description"
            name="description"
            value={addForm.description}
            handleChange={handleChange}
          />
          <TextInput
            label="Store"
            name="store"
            value={addForm.store}
            handleChange={handleChange}
          />
          <AddButton />
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
