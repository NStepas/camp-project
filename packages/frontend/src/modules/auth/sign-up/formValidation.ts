import * as Yup from 'yup';
import {
  IS_REQUIRED,
  PASSWORD_MIN_ERROR,
  PASSWORD_MAX_ERROR,
  EMAIL_ERROR
} from '../../common/consts/validation.const';

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const validate = Yup.object({
  name: Yup.string().required(IS_REQUIRED),
  email: Yup.string().required(IS_REQUIRED).email(EMAIL_ERROR),
  password: Yup.string()
    .required(IS_REQUIRED)
    .min(5, PASSWORD_MIN_ERROR)
    .max(16, PASSWORD_MAX_ERROR)
});

export { initialValues, validate };
