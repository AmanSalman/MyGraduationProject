// import * as yup from 'yup';

// export const createBookSchema = yup.object().shape({
//   isbn: yup.string().required('ISBN is required'),
//   title: yup.string().required('Title is required'),
//   price: yup.number().typeError('Price must be a number').positive('Price must be a positive number').required('Price is required'),
//   description: yup.string().required('Description is required'),
//   publishingHouse: yup.string().required('Publishing House is required'),
//   categoryName: yup.string().required('Category is required'),
//   mainImage: yup
//     .mixed()
//     .required('Main Image is required')
//     .test('fileFormat', 'Supported formats are JPEG, PNG, and WEBP', function (value) {
//       return !value?.length || ['image/jpeg', 'image/png', 'image/webp'].includes(value[0]?.type);
//     })
//     .test('fileSize', 'File size is too large. Max size is 2MB', function(value) {
//       return !value?.length || value[0]?.size <= 2 * 1024 * 1024; // 2MB
//     }),
//   status: yup.string().oneOf(['Active', 'Disabled'], 'Status must be either Active or Disabled').required('Status is required'),
//   stock: yup.number().typeError('Stock must be a number').required('Stock is required').min(1, 'Stock must be at least 1'),
//   subImages: yup
//     .array()
//     .min(1, 'At least one sub image is required')
//     .max(5, 'You can upload up to 5 sub images')
//     .of(
//       yup.mixed().test('file', 'Sub Image is required', function (value) {
//         if (!value) return false;
//         return !!value[0];
//       })
//       .test('fileFormat', 'Supported formats are JPEG, PNG, and WEBP', function (value) {
//         if (!value) return false;
//         return ['image/jpeg', 'image/png', 'image/webp'].includes(value[0]?.type);
//       })
//       .test('fileSize', 'Each sub image must be less than 2MB', function (value) {
//         if (!value) return false;
//         return value[0]?.size <= 2097152; // 2MB
//       })
//     )
//     .typeError('SubImages are required'),
// });
// src/validation.js
import * as yup from 'yup';

export const createBookSchema = yup.object().shape({
  isbn: yup.string().required('ISBN is required'),
  title: yup.string().min(3).required('Title is required'),
  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be a positive number'),
  Discount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Discount must be a number')
    .positive('Discount must be a positive number').min(0)
    .max(100, 'Discount cannot exceed 100%')
    .nullable(),
  categoryName: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  publishingHouse: yup.string(),
  status: yup.string().required('Status is required'),
  stock: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Stock must be a number')
    .required('Stock is required')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),
    mainImage: yup.mixed().nullable().test(
      'is-filelist',
      'Main image is required',
      value => !value || (value instanceof FileList && value.length > 0) // Only validate if a FileList is provided
    ),
    subImages: yup.mixed().nullable().test(
      'is-filelist',
      'Sub images are required',
      value => !value || (value instanceof FileList && value.length > 0) // Only validate if a FileList is provided
    )
});



export const updateBookSchema = yup.object().shape({
  isbn: yup.string(),
  title: yup.string(),
  price: yup
    .number().typeError('Price must be a number').positive('Price must be a positive number')
    ,
    Discount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Discount must be a number')
    .positive('Discount must be a positive number').min(0)
    .max(100, 'Discount cannot exceed 100%')
    .nullable(),
  categoryId: yup.string(),
  description: yup.string(),
  publishingHouse: yup.string(),
  status: yup.string(),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .required('Stock is required')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),
    mainImage: yup
    .mixed().optional()
});




export const subImagesSchema = yup.object().shape({
  subImages: yup.mixed().test(
    'fileSize',
    'Each file should be less than 5MB',
    (value) => {
      if (!value) return true;
      return Array.from(value).every(file => file.size <= 5 * 1024 * 1024);
    }
  ).test(
    'fileType',
    'Only JPEG and PNG image files are allowed',
    (value) => {
      if (!value) return true;
      return Array.from(value).every(file => ['image/jpeg', 'image/png'].includes(file.type));
    }
  )
});

