export const validate = ({ values, setErrors }) => {
  const newErrors = {};

  values.forEach((fieldObj) => {
    const label = fieldObj.label;
    const key = Object.keys(fieldObj)[1];
    const val = fieldObj[key];

    if (!val) {
      newErrors[key] = `Please fill ${label}`;
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
