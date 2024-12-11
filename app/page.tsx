import InitialBackgroundImage from "@/components/childComponent/InitialBackgroundImage";
import MockupLogin from "@/components/parentComponent/MockupLogin";

export default function RegisterAndLogin() {
  return (
    <div className="relative bg-gray-100 p-5 min-h-screen">
      <InitialBackgroundImage />
      <div className="space-x-4"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <MockupLogin />
      </div>
    </div>
  );
}
