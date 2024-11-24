import { Profile } from '@prisma/client';
import { Button } from 'react-bootstrap';
import '../../styles/myProfile.style.css';
import SessionCard from '../../components/SessionCard';

const userId = parseInt(session?.user?.id, 10);

const myProfile = ({ profile }: { profile: Profile }) => (
  <div className="myProfile p-5">
    <h1 className="myProfileTitle text-center">
      <strong>My Profile</strong>
    </h1>
    <div className="myProfileDiv">
      <div className="myProfilePic" />
      <div className="myProfileInfo">
        <h5>
          <strong>Name: </strong>
          {profile.firstName}
        </h5>
        <h5>
          <strong>Major:</strong>
          Computer Science
        </h5>
        <h5>
          <strong>Bio: </strong>
          TA for Calculus 2
        </h5>
        <h5>
          <strong>Socials: </strong>
          IG: jfoo26 Discord: jfoo#26
        </h5>
      </div>
      <div className="px-4">
        <Button className="myBuddiesBtn">Buddies</Button>
      </div>
      <div className="editProfileBtnContainer">
        <Button className="editProfileBtn" href="/editProfile">
          Edit Profile
        </Button>
      </div>
    </div>
    <h1 className="py-4 px-5">
      <strong>My Sessions</strong>
    </h1>

    <div className="sessionListDiv">
      <div className="sessionsList">
        <SessionCard />
        <SessionCard />
        <SessionCard />
        <SessionCard />
      </div>
    </div>
  </div>
);

export default myProfile;
