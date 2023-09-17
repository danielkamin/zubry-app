import { FC } from 'react';
interface ISubHeaderProps {
  textColor?: string;
}
const SubHeader: FC<ISubHeaderProps> = ({ children, textColor = 'gray-700' }) => {
  return <h3 className={`flex text-2xl font-medium mb-6 section-subtitle text-${textColor}`}>{children}</h3>;
};

export default SubHeader;
