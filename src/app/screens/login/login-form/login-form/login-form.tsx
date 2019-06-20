import * as React from 'react';
import { FormikProps } from 'formik';
import { InputText } from '@components/form';
import { Icons } from '@constants/styles';
import { styles } from './login-form.styles';

export type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginForm: React.FC<FormikProps<LoginFormValues>> =
  ({ values, setFieldValue, handleBlur, errors, touched }) => (
    <React.Fragment>
      <InputText
        leftIcon={Icons.account}
        placeholder="Nombre de usuario"
        style={styles.input}
        boxStyle={styles.inputBoxStyle}
        value={values.username}
        onChange={value => setFieldValue('username', value)}
        onBlur={() => handleBlur('username')}
        errorMessage={errors.username && touched.username ? errors.username : null}
      />
      <InputText
        leftIcon={Icons.lock}
        placeholder="Contraseña"
        style={styles.input}
        boxStyle={styles.inputBoxStyle}
        value={values.password}
        onChange={value => setFieldValue('password', value)}
        onBlur={() => handleBlur('password')}
        errorMessage={errors.password && touched.password ? errors.password : null}
        isPassword
      />
    </React.Fragment>
  );
