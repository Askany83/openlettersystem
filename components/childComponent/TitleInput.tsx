import { TitleInputProps } from "@/interfaces/systemInterfaces";

const TitleInput: React.FC<TitleInputProps> = ({
  name,
  value,
  onChange,
}: TitleInputProps) => {
  return (
    <div>
      <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
        <b>Título</b>
      </label>
      <input
        type="text"
        id="title"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default TitleInput;
