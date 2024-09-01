'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.string().email("Invalid email format").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

export default async function signUpAction(formData: { firstName: string, lastName: string, email: string, password: string }) {
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Please verify your data.',
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    const strapiResponse = await fetch(
      `${process.env.STRAPI_BACKEND_URL}/api/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: `${firstName} ${lastName}`,firstName, lastName,  email, password }),
        cache: 'no-cache',
      }
    );

    if (!strapiResponse.ok) {
      const contentType = strapiResponse.headers.get('content-type');
      let errorMessage = strapiResponse.statusText;
      if (contentType && contentType.includes('application/json')) {
        const data = await strapiResponse.json();
        errorMessage = data.error.message;
      }
      return {
        error: true,
        message: errorMessage,
      };
    }
  } catch (error: any) {
    return {
      error: true,
      message: error.message || 'An error occurred during registration.',
    };
  }

  return { error: false };
}

