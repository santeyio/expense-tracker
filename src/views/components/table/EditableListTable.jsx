import React, { useState } from 'react';
import { PencilSquare, XCircleFill, CheckCircleFill } from 'react-bootstrap-icons';

function EditItem({
  editItem,
  setEditItem,
  handleSave,
  textKey,
}) {
  function handleChange(e) {
    setEditItem({
      ...editItem,
      [textKey]: e.target.value,
    });
  }

  function clearCallback() {
    setEditItem({});
  }

  return (
    <tr>
      <td className="d-flex align-items-center">
        <CheckCircleFill
          role="button"
          size="20"
          className="text-success me-3"
          onClick={() => handleSave(editItem, clearCallback)}
        />
        <input
          className="form-control"
          value={editItem[textKey]}
          onChange={handleChange}
        />
      </td>
      <td
        style={{ verticalAlign: 'middle', textAlign: 'right' }}
      >
        <XCircleFill
          role="button"
          size="20"
          className="text-danger"
          onClick={() => setEditItem({})}
        />
      </td>
    </tr>
  );
}

function DisplayItem({ item, setEditItem, textKey }) {
  return (
    <tr>
      <td className="d-flex align-items-center">{item[textKey]}</td>
      <td className="text-end">
        <PencilSquare
          role="button"
          size="20"
          onClick={() => setEditItem(item)}
        />
      </td>
    </tr>
  );
}

function EditableListTable({
  data,
  pkKey = 'id',
  textKey = 'name',
  handleSave = () => console.log('EditableListTable.handleSave placeholder'),
}) {
  const [ editItem, setEditItem ] = useState({});

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-end">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            (editItem[pkKey] === item[pkKey])
              ? (
                <EditItem
                  editItem={editItem}
                  setEditItem={setEditItem}
                  textKey={textKey}
                  handleSave={handleSave}
                />
              ) : (
                <DisplayItem
                  item={item}
                  textKey={textKey}
                  setEditItem={setEditItem}
                />
              )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditableListTable;
