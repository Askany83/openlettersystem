import { FormattedDateProps } from "@/interfaces/systemInterfaces";

const FormattedDate: React.FC<FormattedDateProps> = ({ updatedAt }) => {
  const formattedDate = new Date(updatedAt);

  // Format the date as needed
  const date = formattedDate.toLocaleDateString("pt-PT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Capitalize the first letter of the weekday
  const formattedDateWithCapitalizedWeekday = date.replace(
    /^[a-záàâãä]/i,
    (match) => match.toUpperCase()
  );

  const time = formattedDate.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <p className="text-sm">{`${formattedDateWithCapitalizedWeekday} ${time}`}</p>
  );
};

export default FormattedDate;
