import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // Make sure to import prisma
import SessionCard from '../../components/SessionCard';
import '../../styles/sessions.style.css';

const Sessions = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }

  // Fetch study sessions on the server
  const studySessions = await prisma.studySession.findMany({});

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
          <SessionCard studySessions={studySessions} />
        </div>
      </div>
    </div>
  );
};

export default Sessions;
