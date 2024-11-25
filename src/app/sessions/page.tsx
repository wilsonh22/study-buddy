import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // Make sure to import prisma
import { StudySession } from '@prisma/client';
import SessionCard from '../../components/SessionCard';
import '../../styles/sessions.style.css';

type ExtendedStudySession = StudySession & {
  owner: {
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};
const Sessions = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }

  const userSession = session as unknown as { user: { email: string; id: string; randomKey: string } };
  const currentUser = parseInt(userSession.user.id, 10);

  // Fetch study sessions on the server
  const studySessions: ExtendedStudySession[] = (await prisma.studySession.findMany({
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  })) as ExtendedStudySession[];

  return (
    <div className="sessions">
      <h1 className="sessionsPageTitle">
        <strong>Sessions</strong>
      </h1>
      <div className="createBtnDiv">
        <a href="../createSession" className="createBtn" style={{ textDecoration: 'none' }}>
          + Create Session
        </a>
      </div>
      <div className="sessionListDiv">
        <div className="sessionsList">
          <SessionCard studySessions={studySessions} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Sessions;
