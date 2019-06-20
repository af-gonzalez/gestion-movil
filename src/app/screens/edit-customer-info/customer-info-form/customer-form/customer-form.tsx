import * as React from 'react';
import { InputText } from '@components/form';
import { FormikProps } from 'formik';
import { Icons } from '@constants/styles';

export type FormValues = {
  name: string;
  phoneNumber: string;
};

export const CustomerForm: React.FC<FormikProps<FormValues>> =
  ({ values, setFieldValue, handleBlur, errors, touched }) => (
    <React.Fragment>
      <InputText
        labelIcon={Icons.account}
        value={values.name}
        onChange={value => setFieldValue('name', value)}
        onBlur={handleBlur('name')}
        label="Contacto: *"
        placeholder="Nombre de la persona de contacto"
        errorMessage={errors.name && touched.name ? errors.name : null}
      />
      <InputText
        value={values.phoneNumber}
        labelIcon={Icons.phone}
        onChange={value => setFieldValue('phoneNumber', value)}
        onBlur={handleBlur('phoneNumber')}
        label="Telefono: *"
        placeholder="Telefono"
        errorMessage={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
      />
    </React.Fragment>
  );
