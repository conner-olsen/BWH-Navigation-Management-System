import { Image } from "react-bootstrap";

const UserSelection = () => {
  return (
    <div>
      <Image
        width={500}
        height={500}
        src="public/hospital.jpeg"
        alt="Hospital Image"
        fluid
      />

      <div className="button_layer">test</div>
    </div>
  );
};

export default UserSelection;
