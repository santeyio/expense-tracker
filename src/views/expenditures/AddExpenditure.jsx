/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

// api
import { addExpenditure } from '../../api/expenditure';

// components
import { TextInput, Select, DateInput } from '../components/form';
import { ToDashButton } from '../components';

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
  const {
    category,
    beneficiary,
    date,
    cost,
    description,
    store,
  } = addForm;

  const [ loading, setLoading ] = useState(false);

  function handleChange(event, name) {
    const { value } = event.target;
    dispatch({ type: 'UPDATE_EXPENDITURE_FORM', payload: { [name]: value } });
  }

  function handleAdd() {
    setLoading(true);
    addExpenditure(addForm)
      .then(() => {
        dispatch({ type: 'CLEAR_EXPENDITURE_FORM' });
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));
  categoryOptions.unshift({ value: '', label: 'Select', disabled: true });

  const beneficiaryOptions = beneficiaries.map(b => ({ value: b.id, label: b.name }));
  // set current user as the default option for beneficiary by putting it at the beginning
  // of the options array
  const currentUserIndex = beneficiaryOptions.findIndex(b => b.label.includes(firstName));
  if (currentUserIndex !== -1) {
    const [ currentUser ] = beneficiaryOptions.splice(currentUserIndex, 1);
    beneficiaryOptions.unshift(currentUser);
  }

  // set a default for the beneficiary and date in redux
  useEffect(() => {
    if (beneficiaries.length) {
      dispatch({ type: 'UPDATE_EXPENDITURE_FORM', payload: { beneficiary: beneficiaryOptions[0].value } });
    }
    dispatch({ type: 'UPDATE_EXPENDITURE_FORM', payload: { date: DateTime.now().toISODate() } });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mt-3">
            <ToDashButton />
          </div>

          <Select
            label="Category"
            options={categoryOptions}
            name="category"
            handleChange={handleChange}
            value={category || ''}
          />
          <Select
            label="Who is it for?"
            options={beneficiaryOptions}
            name="beneficiary"
            handleChange={handleChange}
            value={beneficiary}
          />
          <DateInput
            label="Expenditure date"
            name="date"
            value={date}
            handleChange={handleChange}
          />
          <TextInput
            label="Cost"
            name="cost"
            value={cost}
            handleChange={handleChange}
          />
          <TextInput
            label="Description"
            name="description"
            value={description}
            handleChange={handleChange}
          />
          <TextInput
            label="Store"
            name="store"
            value={store}
            handleChange={handleChange}
          />

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

        </div>
      </div>
    </div>
  );
}

export default AddExpense;
