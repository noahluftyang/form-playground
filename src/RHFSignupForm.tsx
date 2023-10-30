import { Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './Input';

const FieldsSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, '최소 8자 이상의 영문, 숫자, 특수문자를 입력해주세요.'),
  confirmPassword: z.string(),
});

export function RHFSignupForm() {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(FieldsSchema),
  });
  const [result, setResult] = useState({});

  return (
    <div>
      <h1>react-hook-form</h1>
      <VStack
        align="stretch"
        as="form"
        gap="8px"
        onSubmit={handleSubmit((values) => {
          setResult(values);
        })}
      >
        <Input label="이메일 주소" {...register('email')} />
        <Controller
          control={control}
          name="password"
          render={({
            field: { name, value, ref, onBlur, onChange },
            fieldState: { error },
          }) => (
            <Input
              bottomText={error?.message}
              error={error != null}
              label="비밀번호"
              name={name}
              ref={ref}
              value={value ?? ''}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
        <ConfirmPasswordField control={control} name="confirmPassword" />
        <Button disabled={isSubmitting} type="submit">
          회원가입
        </Button>
      </VStack>
      <div>제출한 값:</div>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
}

function ConfirmPasswordField({ control, name }) {
  const {
    field: { value, ...field },
  } = useController({
    control,
    name,
  });

  return <Input label="비밀번호 확인" value={value ?? ''} {...field} />;
}
