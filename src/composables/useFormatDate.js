const dateFormatOption = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function useFormatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", dateFormatOption);
}
