export const mergeUniqueElementsById = (arr1, arr2) => {
  // Crear un Set con los ids del primer array (arr1)
  const idsSet = new Set(arr1.map((item) => item.id));

  // Filtrar los elementos de arr2 que no están en el Set de ids de arr1
  const uniqueFromArr2 = arr2.filter((item) => !idsSet.has(item.id));

  // Concatenar los elementos de arr1 con los elementos únicos de arr2
  const mergedArray = arr1.concat(uniqueFromArr2);

  return mergedArray;
};
