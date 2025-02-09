import { FC } from 'react';
import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

interface IBasicContentProps {
  content: string;
  errorMsg: string;
}

const BasicContent: FC<IBasicContentProps> = ({ content, errorMsg = 'Brak treści postu...' }) => {
  const edjsParser = edjsHTML();
  const HTML = content ? edjsParser.parse(JSON.parse(content)) : null;

  return (
    <article className="prose prose-md">
      <div>{HTML ? Parser().parse(HTML.join('')) : errorMsg}</div>
    </article>
  );
};

export default BasicContent;
