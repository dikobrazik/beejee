import { FieldError } from 'react-hook-form';
import { ErrorTypeDescriptions } from '../../../domain/enums/ErrorTypeDescriptions';

type Props = {
  error?: FieldError;
};

const ErrorMessage = (props: Props) => {
  const { error } = props;
  if (error) {
    const errorMessage =
      error?.message || ErrorTypeDescriptions[error?.type as keyof typeof ErrorTypeDescriptions] || 'Ошибка';
    return <span className="text-danger">{errorMessage}</span>;
  }
  return null;
};

export default ErrorMessage;
