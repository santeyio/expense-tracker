/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  SortAlphaDown,
  SortAlphaDownAlt,
  SortNumericDown,
  SortNumericDownAlt,
} from 'react-bootstrap-icons';

// components
import Caret from '../elements/Caret';

/*
 * Example schema
 *
 * {
 *   cols: [
 *     {
 *       header: 'Header',
 *       field: 'carrier_id',
 *       formatter: () => {},
 *       clickHandler: (<field|row>) => {}, // this is overridden by rowClickHandler
 *       passAllData: true|false,
 *       openSubComponent: true|false,
 *       sortKey: 'carrier_id',
 *       cellClasses: '',
 *       cellStyle: { ...styles...},
 *       alphaSortIcon: true|false,
 *       subComponentID: 'edit' // can be used to conditionally return a subComponent
 *       subComponentIcon: (open) => {}
 *     },
 *   ],
 *   rowClickHandler: (<row>) => {}, // overrides cell clickHandler if set
 *   subComponentContainerStyle: { ...styles... },
 *   subComponent: () => <Component />,
 *   sortClickCallback: (currentSortKey, currentSortDirection) => {},
 *   sortKeySetter: ('newSortKeyVal') => { <do something with new sort key val> },
 *   sortKeyGetter: () => 'sortKeyStr',
 *   sortDirectionGetter: () => 'asc|desc',
 *   sorDirectionSetter: ('asc|desc') => { <do something with new direction> },
 * }
 *
 * NOTES:
 * - the `clickHandler` is passed either the field data or the whole row (object) of data
 *   depending on if `passAllData` is set or not.
 *
 */

function TableRow({ schema, data }) {
  const [ subComponentOpen, setSubComponentOpen ] = useState(false);
  const [ subComponentID, setSubComponentID ] = useState('');
  const hasSubComponent = Boolean(schema.subComponent);
  const { rowClickHandler } = schema;

  return (
    <>
      <tr
        role={rowClickHandler ? 'button' : undefined}
        onClick={() => (rowClickHandler ? rowClickHandler(data) : () => {})}
      >
        {schema.cols.map(c => {
          if (!c) return null; // don't display falsey valued cols

          // For each column in the schema you can pass a `conditionalCheck` function.
          // This function is passed the cell's data value as an argument, and the output
          // of the function is passed to the formatter function so that it can be used
          // in formatting the cell.
          let conditionalOutput = false;
          if (c.conditionalCheck) conditionalOutput = c.conditionalCheck(data[c.field]);

          // allows us to inform the c.formatter that it is open for conditional rendering/styling
          const isOpen = subComponentOpen && subComponentID === c.subComponentID;

          // For each column in the schema you can pass a `formatter` function which is
          // passed the data for each cell in the column as a first arg and the output
          // of the `conditionalCheck` function (if a `conditionalCheck` is defined).
          let content = data[c.field];
          if (c.formatter) {
            // instead of specifying a `field` in the column configuration you can set
            // the boolean flag `passAllData` which will pass the entire object for
            // the row to the formatter function instead of a specific key within the
            // row's object.
            const formatterData = (c.passAllData ? data : data[c.field]);
            content = c.formatter(formatterData, conditionalOutput, isOpen);
          }

          /* ----------------- Rendering logic ----------------- */

          // if this cell is clicked on to open the sub table...
          if (c.openSubComponent && hasSubComponent) {
            const subComponentIcon = c.subComponentIcon
              ? (c.subComponentIcon(isOpen))
              : (<Caret isOpen={isOpen} className="ms-2" />);

            return (
              <td
                className={c.cellClasses}
                style={c.cellStyle}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (subComponentOpen && subComponentID !== c.subComponentID) {
                    // User is clicking between two subComponents, do not close it
                  } else {
                    setSubComponentOpen(!subComponentOpen);
                  }
                  setSubComponentID(c.subComponentID);
                }}
                title={c.title}
                key={c.header}
              >
                {content}
                {subComponentIcon}
              </td>
            );

          // if this cell has a click handler. The click handler is passed
          // the value of the cell as an arg. If `passAllData` flag is true
          // then instead of the field the whole object is passed to the click handler.
          } else if (c.clickHandler) { // eslint-disable-line no-else-return
            const arg = c.passAllData ? data : data[c.field];
            return (
              <td
                className={c.cellClasses}
                style={c.cellStyle}
                role="button"
                tabIndex={0}
                onClick={() => c.clickHandler(arg)}
                title={c.title}
                key={c.header}
              >
                {content}
              </td>
            );
          }

          // else just a normal cell, return the data unformatted
          return (
            <td
              key={c.header}
              title={c.title}
              className={c.cellClasses}
              style={c.cellStyle}
            >
              {content}
            </td>
          );
        })}
      </tr>

      {/* if we have a sub table, stick it in a table row directly below it's parent */}
      {hasSubComponent && subComponentOpen && (
        <tr
          key={JSON.stringify(data)}
          className={schema.subComponentContainerClasses}
          style={schema.subComponentContainerStyle || {}}
        >
          <td colSpan={schema.cols.length}>
            {schema.subComponent({ ...data, subComponentID })}
          </td>
        </tr>
      )}
    </>
  );
}

function HeaderCol({ col, schema }) {
  // 'desc' or 'asc' or falsey
  let currentSortDirection = schema.sortDirectionGetter ? schema.sortDirectionGetter() : undefined;
  let currentSortKey = schema.sortKeyGetter ? schema.sortKeyGetter() : undefined;
  const callback = schema.sortClickCallback || (() => {});

  /* eslint-disable no-lonely-if */
  // NOTE(santeyio): maybe a little confusing... but it works... lol
  function handleClick() {
    if (currentSortKey === col.sortKey) {
      // toggle through 3 sort directions, if ascending is specified start with ascending
      if (col.defaultSortOrder === 'asc') {
        if (!currentSortDirection) {
          schema.sortDirectionSetter('asc');
          currentSortDirection = 'asc';
        } else if (currentSortDirection === 'asc') {
          schema.sortDirectionSetter('desc');
          currentSortDirection = 'desc';
        } else if (currentSortDirection === 'desc') {
          schema.sortDirectionSetter(undefined);
          schema.sortKeySetter(undefined);
          currentSortDirection = undefined;
          currentSortKey = undefined;
        }

      // toggle through 3 sort directions starting with descending
      } else {
        if (!currentSortDirection) {
          schema.sortDirectionSetter('desc');
          currentSortDirection = 'desc';
        } else if (currentSortDirection === 'desc') {
          schema.sortDirectionSetter('asc');
          currentSortDirection = 'asc';
        } else if (currentSortDirection === 'asc') {
          schema.sortDirectionSetter(undefined);
          schema.sortKeySetter(undefined);
          currentSortDirection = undefined;
          currentSortKey = undefined;
        }
      }

    // else if the current sort key is not already selected start from the beginning
    // of the 3 term cycle
    } else {
      // if ascending is the default sort order
      if (col.defaultSortOrder === 'asc') {
        schema.sortDirectionSetter('asc');
        schema.sortKeySetter(col.sortKey);
        currentSortDirection = 'asc';
        currentSortKey = col.sortKey;

      // if ascending is not specified as the default sort order, start with descending
      } else {
        schema.sortDirectionSetter('desc');
        schema.sortKeySetter(col.sortKey);
        currentSortDirection = 'desc';
        currentSortKey = col.sortKey;
      }
    }
    callback(currentSortKey, currentSortDirection);
  }

  function renderIcon() {
    if (col.alphaSortIcon) {
      if (currentSortDirection === 'desc') return <SortAlphaDownAlt className="ms-2" />;
      if (currentSortDirection === 'asc') return <SortAlphaDown className="ms-2" />;
    } else if (col.numberSortIcon) {
      if (currentSortDirection === 'desc') return <SortNumericDownAlt className="ms-2" />;
      if (currentSortDirection === 'asc') return <SortNumericDown className="ms-2" />;
    } else {
      if (currentSortDirection === 'desc') return <ArrowDown className="ms-2" />;
      if (currentSortDirection === 'asc') return <ArrowUp className="ms-2" />;
    }
    return null;
  }

  // if column is sortable
  if (col.sortKey) {
    if (!schema.sortKeySetter) console.error('Table schema must specify a sortKeySetter function');
    if (!schema.sortKeyGetter) console.error('Table schema must specify a sortKeyGetter function');
    if (!schema.sortDirectionSetter) console.error('Table schema must specify a sortDirectionSetter function');
    if (!schema.sortDirectionGetter) console.error('Table schema must specify a sortDirectionGetter function');

    return (
      <th
        role="button"
        tabIndex={0}
        onClick={handleClick}
        scope="col"
      >
        {col.header}
        {(col.sortKey === currentSortKey) && renderIcon()}
      </th>
    );
  }

  // if column is not sortable
  return <th scope="col">{col.header}</th>;
}

function Table({
  schema = {},
  data = [],
  loading,
  className,
  id,
  style = {},
  errorMessage,
}) {
  return (
    <table
      id={id}
      className={className}
      style={style}
    >
      <thead>
        <tr>
          {schema.cols.map(col => (
            col ? <HeaderCol key={col.header} col={col} schema={schema} /> : null
          ))}
        </tr>
      </thead>
      <tbody>
        {(data.length > 0) && !loading && data.map(row => (
          <TableRow key={JSON.stringify(row)} schema={schema} data={row} />
        ))}
        {errorMessage && (
          <tr>
            <td className="text-center py-4" colSpan={schema.cols.length}>
              <i className="text-danger">{errorMessage}</i>
            </td>
          </tr>
        )}
        {(data.length === 0) && !loading && !errorMessage && (
          <tr>
            <td className="text-center py-4" colSpan={schema.cols.length}>
              <i>No records found</i>
            </td>
          </tr>
        )}
        {loading && (
          <tr>
            <td colSpan={schema.cols.length} className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
