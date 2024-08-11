// validationSchema.js
import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
    name: Yup.string()
        .required('Category Name is required')
        .min(3, 'Category Name must be at least 2 characters')
        .trim('Category Name should not contain leading/trailing spaces'),
        image: Yup.mixed()
  .nullable()
  .test('fileType', 'Only JPEG and PNG image files are allowed', (value) => {
    if (!value) return true; // If no value, skip validation
    return ['image/jpeg', 'image/png'].includes(value.type);
  })
  .test('is-file', 'Main image must be a File object', (value) => {
    if (!value) return true; // If no value, skip validation
    return value instanceof File;
  })

});



