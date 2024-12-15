// import postCard from "@/public/backgroundAfterLogin.jpg";

const BackgroundImageAfterLogin = () => {
  return (
    <div
      className="fixed inset-0 w-full h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/backgroundAfterLogin.jpg')`,
      }}
    />
  );
};

export default BackgroundImageAfterLogin;
