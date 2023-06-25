const Header = ({ title }) => {
  return (
    <div className="flex justify-center  mb-16">
      <div className="text-5xl font-semibold uppercase mt-3">
        <p className="text-gray-700 py-2 px-8 text-center w-full">{title}</p>
      </div>
    </div>
  );
};

export default Header;
