import Image from "next/image";

const RenderProfilePic = () => {
  return (
    <div className="relative w-full h-48">
      <Image
        src={"/genericProfilePicture.png"}
        alt="Profile"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 
              (max-width: 1200px) 50vw, 
              33vw"
        className="object-cover"
      />
    </div>
  );
};

export default RenderProfilePic;
