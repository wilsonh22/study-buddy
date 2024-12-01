import { Suspense } from 'react';
import authOptions from '@/lib/auth';
import { getServerSession } from 'next-auth';
import EditSessionContent from '@/components/EditSessionContent';

const EditSessionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }

  const userSession = session as unknown as { user: { email: string; id: string; randomKey: string } };
  const currentUser = parseInt(userSession.user.id, 10);

  return (
    <Suspense fallback="Loading...">
      <EditSessionContent currentUser={currentUser} />
    </Suspense>
  );
};
export default EditSessionPage;
