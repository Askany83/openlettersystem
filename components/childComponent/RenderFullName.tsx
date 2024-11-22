import { LetterReceiver } from "@/interfaces/systemInterfaces";

const RenderFullName: React.FC<LetterReceiver> = ({ name, surname, job }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">
        {name} {surname}
      </h2>
      <p className="text-gray-600">{job}</p>
    </div>
  );
};

export default RenderFullName;
