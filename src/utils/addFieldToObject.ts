function addFieldToObject(fields) {
  const result = {};
  for (const [field, value] of Object.entries(fields)) {
    result[field] = value;
  }
  return result;
}
