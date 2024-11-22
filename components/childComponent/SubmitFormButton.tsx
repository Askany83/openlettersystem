interface SubmitFormButtonProps {
  isSubmitting: boolean;
  buttonText: string;
}

const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({
  isSubmitting,
  buttonText,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
    >
      {buttonText}
    </button>
  );
};

export default SubmitFormButton;
