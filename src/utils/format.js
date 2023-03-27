export function apiFmtExpenditure(e) {
  return {
    cost: e.cost,
    date: e.date,
    store: e.store,
    description: e.description,
    beneficiary: Number(e.beneficiary),
    category: Number(e.category),
  };
}

export function fmtExpenditure(e) {
  return {
    id: e.id,
    cost: e.cost,
    date: e.date,
    store: e.store,
    description: e.description,
    beneficiary: e.beneficiary,
    category: e.category,
  };
}

export function fmtHousehold(h) {
  if (typeof h === 'object') {
    return {
      id: h.id,
      name: h.name,
    };
  }
  return {};
}

export function fmtUser(u) {
  return {
    firstName: u.first_name,
    lastName: u.last_name,
    household: fmtHousehold(u.household),
  };
}
