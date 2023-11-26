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
  id: number;
}
const getCardFullClassesFromSize = () => {
  const classes = {
    container: 'relative',
    title:
      'text-center font-medium w-full rounded-2xl flex items-center justify-center relative text-gray-700 text-xl h-20',
    imageWrapper: 'relative h-72 rounded-t-xl overflow-hidden',
    contentPreview: 'p-2 text-gray-600',
    date: 'w-full pr-2 text-right text-sm absolute bottom-1 right-1 text-gray-600 italic',
    image: 'rounded-t-xl absolute object-cover w-full h-full',
    linkContainer: '',
    content: ''
  };

  return classes;
};

const NewsCard: FC<INewsCardProps> = ({ article, id }) => {
  const edjsParser = edjsHTML();
  const HTML = article.Content ? edjsParser.parse(JSON.parse(article.Content)) : null;
  const thumbnail = article.Image.data;
  const classes = getCardFullClassesFromSize();
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
            <img
            alt={article.Title}
            src={`/strapi${getThumbnailSrc(thumbnail.attributes)}`}
            className={classes.image}
          />
          ) : (
            <div className="flex justify-center items-center w-full h-full">
                <PictureOutlined className="absolute text-gray-800 z-50 text-3xl" />
            </div>
          )}
        </div>
        <div className={classes.content}>
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
