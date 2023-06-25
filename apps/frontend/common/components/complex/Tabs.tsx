import { FC, useState } from 'react';
import { ReactElement } from 'react';

import Tab from '@/components/simple/Tab';

interface TabsProps {
  children: ReactElement[];
  navClass?: string;
  contentClass?: string;
  wrapperClass?: string;
}
const Tabs: FC<TabsProps> = ({ children, contentClass = '', wrapperClass = '', navClass = '' }) => {
  const [activeTab, setActiveTab] = useState<string>(children[0].props.title);

  return (
    <div className={wrapperClass}>
      <ol
        className={`tabs-list flex justify-center border-b border-gray-200 text-base font-base text-gray-800 ${navClass}`}
      >
        {children.map((tab) => (
          <Tab activeTab={activeTab} key={tab.props.title} title={tab.props.title} setActiveTabHandler={setActiveTab} />
        ))}
      </ol>
      <div className={contentClass}>
        {children.map((tab) => {
          if (tab.props.title !== activeTab) return undefined;
          return tab.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
