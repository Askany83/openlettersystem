interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
        Título
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default TitleInput;
