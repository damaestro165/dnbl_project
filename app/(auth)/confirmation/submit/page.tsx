import ConfirmationSubmit from '@/components/auth/ConfirmationSubmit';

type Props = {
  searchParams: {
    confirmation?: string,
  },
};

export default async function page({ searchParams }: Props) {
  return <ConfirmationSubmit confirmationToken={searchParams?.confirmation} />;
}