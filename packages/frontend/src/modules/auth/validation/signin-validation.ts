import * as Yup from 'yup';
import {
  IS_REQUIRED,
  PASSWORD_MAX_ERROR,
  PASSWORD_MIN_ERROR
} from '../../common/constants/form-validation-constants';

const validate = Yup.object({
  name: Yup.string().required(IS_REQUIRED),
  password: Yup.string()
    .required(IS_REQUIRED)
    .min(5, PASSWORD_MIN_ERROR)
    .max(16, PASSWORD_MAX_ERROR)
});

export { validate };
