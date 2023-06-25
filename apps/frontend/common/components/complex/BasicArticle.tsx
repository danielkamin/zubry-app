import React from 'react';
import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

interface Props {
  content: string;
}

const BasicArticle: React.FC<Props> = ({ content }) => {
  const edjsParser = edjsHTML();
  const HTML = content ? edjsParser.parse(JSON.parse(content)) : null;

  return (
    <article className="prose prose-md">
      <div>{HTML ? Parser().parse(HTML.join('')) : 'Brak treści postu...'}</div>
    </article>
  );
};

export default BasicArticle;
