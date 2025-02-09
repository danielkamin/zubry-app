/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const getErrorBasedImageSrc = (errorCode) => {
  let imageSrc = '';
  switch (errorCode) {
    case 404:
      imageSrc = '/404.svg';
      break;
    case 500:
      imageSrc = '/500.svg';
      break;
    case 403:
      imageSrc = '/403.svg';
      break;
    default:
      imageSrc = '/500.svg';
  }
  return imageSrc;
};
const ErrorMessage = ({ message, code }) => {
  return (
    <div className="lg:w-3/6 md:w-4/6 w-4/5 text-center">
      <div className="text-center mb-10">
        <h1 className="mb-10 text-4xl font-semibold">{message}</h1>
        <Link href="/" className="text-gray-500 underline">
          Powrót na stronę główną
        </Link>
      </div>
      <img src={getErrorBasedImageSrc(code)} alt="404" className="w-4/5 m-auto" />
    </div>
  );
};

export default ErrorMessage;
