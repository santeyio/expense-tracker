export function parseError(DRFErr = { errors: [{ detail: '' }] }) {
  const { type } = DRFErr;
  const str = DRFErr.errors[0].detail;
  if (!str) {
    return '';
  }
  return `${str} (${type})`;
}

export function otherThing(foo) {
  return `${foo}bar`;
}
