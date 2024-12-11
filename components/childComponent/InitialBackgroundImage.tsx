import Image from "next/image";
import background from "@/public/background.jpg";

const InitialBackgroundImage = () => {
  return (
    <Image
      alt="Background"
      src={background}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  );
};

export default InitialBackgroundImage;
