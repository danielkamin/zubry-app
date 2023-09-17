import { Dispatch, FC, SetStateAction } from 'react';

interface TabProps {
  activeTab: string;
  title: string;
  setActiveTabHandler: Dispatch<SetStateAction<string>>;
}

const Tab: FC<TabProps> = ({ activeTab, setActiveTabHandler, title }) => {
  const activeTabClassName = title === activeTab ? 'border-primary-6 border-b-2' : 'border-gray-200';
  return (
    <li
      className={`${activeTabClassName} -mb-px border-b py-6 px-6 transition-opacity md:hover:opacity-50 cursor-pointer`}
      onClick={() => setActiveTabHandler(title)}
    >
      {title}
    </li>
  );
};

export default Tab;
