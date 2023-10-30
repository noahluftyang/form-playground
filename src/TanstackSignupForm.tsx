import { Button, VStack } from '@chakra-ui/react';
import { useField, useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { z } from 'zod';
import { Input } from './Input';

interface Fields {
  email: string;
  password: string;
  confirmPassword: string;
}

export function TanstackSignupForm() {
  const [result, setResult] = useState({});
  const { Field, Provider, Subscribe, handleSubmit } = useForm<
    Fields,
    typeof zodValidator
  >({
    onSubmit(values) {
      setResult(values);
    },
    validator: zodValidator,
  });

  return (
    <div>
      <h1>@tanstack/react-form</h1>
      <Provider>
        <VStack
          align="stretch"
          as="form"
          gap="8px"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Field
            name="email"
            children={({ name, state, handleBlur, handleChange }) => (
              <Input
                defaultValue={state.value}
                label="이메일 주소"
                name={name}
                onBlur={handleBlur}
                onChange={({ currentTarget: { value } }) => handleChange(value)}
              />
            )}
          />
          <Field
            name="password"
            onBlur={z
              .string()
              .min(8, '최소 8자 이상의 영문, 숫자, 특수문자를 입력해주세요.')}
            children={({ name, state, handleBlur, handleChange }) => {
              console.log(state.meta);

              return (
                <Input
                  bottomText={state.meta.touchedErrors}
                  error={state.meta.touchedErrors.length > 0}
                  label="비밀번호"
                  name={name}
                  value={state.value ?? ''}
                  onBlur={handleBlur}
                  onChange={({ currentTarget: { value } }) =>
                    handleChange(value)
                  }
                />
              );
            }}
          />
          <ConfirmPasswordField />
          <Subscribe
            children={({ isSubmitting }) => (
              <Button disabled={isSubmitting} type="submit">
                회원가입
              </Button>
            )}
          />
        </VStack>
      </Provider>
      <div>제출한 값:</div>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
}

function ConfirmPasswordField() {
  const { name, state, handleBlur, handleChange } = useField({
    name: 'confirmPassword',
  });

  return (
    <Input
      label="비밀번호 확인"
      name={name}
      value={state.value ?? ''}
      onBlur={handleBlur}
      onChange={({ currentTarget: { value } }) => handleChange(value)}
    />
  );
}
