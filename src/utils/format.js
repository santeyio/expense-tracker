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
    cost: e.cost,
    date: e.date,
    store: e.store,
    description: e.description,
    beneficiary: e.beneficiary,
    category: e.category,
  };
}
