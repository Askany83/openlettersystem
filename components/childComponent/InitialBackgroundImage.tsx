import Image from "next/image";
import background from "@/public/background.jpg";

const InitialBackgroundImage = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full opacity-30">
      <Image
        alt="Background"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
};

export default InitialBackgroundImage;
