interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
        Corpo da carta
      </label>
      <textarea
        id="message"
        name="message"
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
