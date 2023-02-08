import * as Yup from 'yup';
import {
  //   EMAIL_ERROR,
  IS_REQUIRED,
  PASSWORD_MAX_ERROR,
  PASSWORD_MIN_ERROR
} from '../../common/consts/validation.const';

const initialValues = {
  name: '',
  password: ''
};

const validate = Yup.object({
  name: Yup.string().required(IS_REQUIRED),
  password: Yup.string()
    .required(IS_REQUIRED)
    .min(5, PASSWORD_MIN_ERROR)
    .max(16, PASSWORD_MAX_ERROR)
});

export { initialValues, validate };
