import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // Make sure to import prisma
import { StudySession } from '@prisma/client';
import { Button } from 'react-bootstrap';
import SessionCard from '../../components/SessionCard';
import '../../styles/sessions.style.css';

type ExtendedMySession = StudySession & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  users: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
      bio: string;
      major: string;
      collegeRole: string;
      social: string;
      profilePicUrl: string;
    };
    myBuddies?: {
      buddyId: number;
    }[];
  }[];
};

const mySessions = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }
  const userSession = session as unknown as { user: { email: string; id: string; randomKey: string } };
  const currentUser = parseInt(userSession.user.id, 10);

  // Fetch study sessions on the server
  const studySessions: ExtendedMySession[] = (await prisma.studySession.findMany({
    where: {
      users: {
        some: {
          id: currentUser,
        },
      },
    },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
      users: {
        select: {
          id: true,
          profile: true,
        },
      },
    },
  })) as ExtendedMySession[];

  return (
    <div className="sessions">
      <h1 className="sessionsPageTitle">
        <strong>My Sessions</strong>
      </h1>
      <Button as="a" href="../createSession" className="createBtn" style={{ textDecoration: 'none' }}>
        +
      </Button>
      <div className="sessionListDiv">
        <SessionCard studySessions={studySessions} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default mySessions;
