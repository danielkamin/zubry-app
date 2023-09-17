import Image from "next/legacy/image";
import { PictureOutlined } from '@ant-design/icons';
import { FC } from 'react';
import Link from 'next/link';
import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

import CustomDate from 'src/components/simple/CustomDate';
import { TStrapiArticle, TStrapiImageWithFormats } from '@/types';

interface INewsCardProps {
  article: TStrapiArticle;
  textLen?: number;
  size: string;
  id: number;
}
const getCardFullClassesFromSize = (size: string) => {
  const classes = {
    container: 'relative',
    title: 'text-center font-medium w-full rounded-2xl flex items-center justify-center relative',
    imageWrapper: 'relative',
    contentPreview: 'p-2 text-gray-600',
    date: 'w-full pr-2 text-right text-sm absolute bottom-1 right-1',
    image: '',
    linkContainer: '',
    content: ''
  };

  switch (size) {
    case 'small':
      classes.date += ' text-gray-600 italic ';
      classes.imageWrapper += ' h-72 rounded-xl';
      classes.image = 'rounded-t-xl';
      classes.title += ' text-gray-700 text-xl h-20';
      classes.contentPreview = 'hidden';
      classes.content = 'h-auto';
      break;
    case 'medium':
      classes.container += ' ';
      classes.imageWrapper += ' h-40';
      classes.date += ' text-gray-400 ';
      classes.contentPreview += ' h-14 overflow-hidden overflow-ellipsis content-preview';
      classes.title += '  text-lg';
      classes.content = 'h-24';
      break;
    case 'large':
      classes.container += ' ';
      classes.imageWrapper += ' h-80';
      classes.date += ' text-gray-400';
      classes.title += '  text-xl ';
      classes.contentPreview += ' h-44 overflow-hidden overflow-ellipsis content-preview';
      classes.linkContainer += ' w-full';
      classes.content = 'h-auto';
      break;
    default:
      console.error('No "size" prop!');
      break;
  }
  return classes;
};

const NewsCard: FC<INewsCardProps> = ({ article, textLen, size, id }) => {
  const edjsParser = edjsHTML();
  const HTML = article.Content ? edjsParser.parse(JSON.parse(article.Content)) : null;
  const thumbnail = article.Image.data;
  const classes = getCardFullClassesFromSize(size);
  const getThumbnailSrc = (newsCardImage: TStrapiImageWithFormats) => {
    if (newsCardImage.formats) {
      if (newsCardImage.formats.small) return newsCardImage.formats.small.url;
      else if (newsCardImage.formats.thumbnail) return newsCardImage.formats.thumbnail.url;
    } else return newsCardImage.url;
  };
  return (
    <Link
      href={`/aktualnosci/${id}`}
      className={`news-card ${classes.container} h-96 w-72 sm:w-96 sm:h-96 hover:shadow-2xl rounded-xl bg-white shadow-xl border ${classes.linkContainer}`}
    >
      <div className="h-full">
        <div className={classes.imageWrapper}>
          {thumbnail ? (
            <Image
              layout="fill"
              objectFit="cover"
              priority
              alt={article.Title}
              src={`/strapi${getThumbnailSrc(thumbnail.attributes)}`}
              className={classes.image}
            />
          ) : (
            <div className="flex justify-center items-center text-white w-full h-full">
              <PictureOutlined className="absolute text-white z-50 text-3xl" />
            </div>
          )}
        </div>
        <div className={classes.content}>
          <div className={classes.contentPreview}>
            {HTML && Parser().parse(HTML.join('').substring(0, textLen).trim() + '...')}
          </div>
          <span className={classes.date}>
            <CustomDate dateString={new Date(article.publishedAt).toJSON()} />{' '}
          </span>
          <div className={classes.title}>
            <p className="two-line-clamp">{article.Title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
