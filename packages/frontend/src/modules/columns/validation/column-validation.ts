import * as Yup from 'yup';
import { IS_REQUIRED } from '../../common/constants/form-validation-constants';

const validate = Yup.object({
  name: Yup.string().required(IS_REQUIRED)
});

export { validate };
