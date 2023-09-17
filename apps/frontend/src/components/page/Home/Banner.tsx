import { ReactNode, FC } from 'react';
import { motion } from 'framer-motion';

interface IBannerProps {
  size: 's' | 'md' | 'xl';
  imageUrl: string;
  children?: ReactNode;
}

const Banner: FC<IBannerProps> = ({ size, children, imageUrl }) => {
  const getBannerHeightFromSize = () => {
    switch (size) {
      case 's':
        return 'md:h-v50 h-v25';
      case 'md':
        return 'h-v75';
      case 'xl':
        return 'h-screen';
    }
  };
  return (
    <div className={`w-full ${getBannerHeightFromSize()}`}>
      <div
        className={`w-full ${getBannerHeightFromSize()} absolute top-0 left-0 z-index-negative flex items-center justify-center`}
      >
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-3xl font-bold text-white tracking-wide text-center text-shadow-lg"
        >
          {children}
        </motion.h1>
        <div className="parallax-banner" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
        {/* <div className="absolute top-0 left-0 bg-black opacity-20 w-full h-full"></div> */}
      </div>
    </div>
  );
};

export default Banner;
