import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  confirmationToken?: string;
};

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card>
  <CardHeader>
    <CardTitle className='text-amber-600'>Email Confirmation Response</CardTitle>
  </CardHeader>
  <CardContent>
        <div className='rounded-sm px-4 py-8 mb-8'>{children}</div>
  </CardContent>

</Card>
    
  );
}

export default async function ConfirmationSubmit({ confirmationToken }: Props) {
  if (!confirmationToken || confirmationToken === '') {
    return (
      <Wrapper>
        
        <p>Token is not valid.</p>
      </Wrapper>
    );
  }

  // send email validation request to strapi and wait for the response.
  try {
    const strapiResponse = await fetch(
      `${process.env.STRAPI_BACKEND_URL}/api/auth/email-confirmation?confirmation=${confirmationToken}`
    );
    if (!strapiResponse.ok) {
      let error = '';
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data = await strapiResponse.json();
        error = data.error.message;
      } else {
        error = strapiResponse.statusText;
      }
      return (
        <Wrapper>
          
          <p>Error: {error}</p>
        </Wrapper>
      );
    }
    // success, do nothing
  } catch (error: any) {
    return (
      <Wrapper>
       
        <p>{error.message}</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2 className='font-bold text-lg mb-4'>Email confirmed.</h2>
      <p>
        Your email was successfully verified. You can now login
        <Link href='/sign-in' className='underline'>
          login
        </Link>
        .
      </p>
    </Wrapper>
  );
}