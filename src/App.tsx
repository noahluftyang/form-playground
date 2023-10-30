import { Container, SimpleGrid } from '@chakra-ui/react';
import { RHFSignupForm } from './RHFSignupForm';
import { TanstackSignupForm } from './TanstackSignupForm';

export default function App() {
  return (
    <Container maxWidth="container.lg" paddingY="40px">
      <SimpleGrid columns={2} gap="16px">
        <RHFSignupForm />
        <TanstackSignupForm />
      </SimpleGrid>
    </Container>
  );
}
