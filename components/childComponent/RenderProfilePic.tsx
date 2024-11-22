import Image from "next/image";

const RenderProfilePic = () => {
  return (
    <div className="relative w-full h-48">
      <Image
        src={"/genericProfilePicture.png"}
        alt="Profile"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default RenderProfilePic;
