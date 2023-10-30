import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as _Input,
} from '@chakra-ui/react';
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from 'react';

export const Input = forwardRef(function Input(
  {
    bottomText,
    error,
    label,
    ...props
  }: ComponentProps<typeof _Input> & {
    bottomText: ReactNode;
    error?: boolean;
    label: ReactNode;
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <FormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <_Input ref={ref} {...props} />
      {error === true ? (
        <FormErrorMessage>{bottomText}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
});
