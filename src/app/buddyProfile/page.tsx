import { Button } from 'react-bootstrap';
import '../../styles/buddyProfile.style.css';
import BuddyCard from '../../components/BuddyCard';

const buddyProfile = () => (
  <div className="myBuddy p-5">
    <h1 className="myBuddyTitle text-center">
      <strong>Wilson&apos;s Profile</strong>
    </h1>
    <div className="myBuddyDiv">
      <div className="myBuddyPic" />
      <div className="myBuddyInfo">
        <h5>
          <strong>Name: </strong>
          Wilson Huynh whuynh26
        </h5>
        <h5>
          <strong>Major:</strong>
          Computer Science
        </h5>
        <h5>
          <strong>Bio: </strong>
          Coding is hard
        </h5>
        <h5>
          <strong>Socials: </strong>
          IG: wilhn26 Discord: wilhn#26
        </h5>
      </div>
      <div className="px-4">
        <Button className="theirBuddiesBtn">Buddies</Button>
      </div>
      <div className="editProfileBtnContainer">
        <Button className="editProfileBtn" href="/editProfile">
          Add Buddy
        </Button>
      </div>
    </div>
    <h1 className="py-4 px-5">
      <strong>My buddies</strong>
    </h1>

    <div className="sessionListDiv">
      <div className="sessionsList">
        <BuddyCard />
        <BuddyCard />
        <BuddyCard />
        <BuddyCard />
      </div>
    </div>
  </div>
);

export default buddyProfile;
