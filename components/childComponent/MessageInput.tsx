import { MessageInputProps } from "@/interfaces/systemInterfaces";

const MessageInput: React.FC<MessageInputProps> = ({
  name,
  value,
  onChange,
}: MessageInputProps) => {
  return (
    <div>
      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
        <b>Corpo da carta</b>
      </label>
      <textarea
        id="message"
        name={name}
        value={value}
        onChange={onChange}
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default MessageInput;
