import Image from "next/image";
import postCard from "@/public/backgroundAfterLogin.jpg";

const BackgroundImageAfterLogin = () => {
  return (
    <Image
      alt="Background"
      src={postCard}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  );
};

export default BackgroundImageAfterLogin;
