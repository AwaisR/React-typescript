import { Container } from '@mui/system'

export default function ContainerLayout({ children }: any) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: '50px',
        marginBottom: '50px'
      }}
    >
      {children}
    </Container>
  )
}
