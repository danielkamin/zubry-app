const Badge = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-primary-1 px-2 py-1 text-sm font-medium text-primary-9 ring-1 ring-inset ring-primary-5 uppercase">
      {text}
    </span>
  );
};

export default Badge;
