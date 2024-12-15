import InitialBackgroundImage from "@/components/childComponent/InitialBackgroundImage";
import MockupLogin from "@/components/parentComponent/MockupLogin";

export default function RegisterAndLogin() {
  return (
    <div className="relative bg-gray-100 p-5 w-full h-screen">
      <InitialBackgroundImage />
      <div className="space-x-4"></div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <MockupLogin />
      </div>
    </div>
  );
}
