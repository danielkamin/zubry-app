import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

const NewsBody = ({ content }) => {
  const edjsParser = edjsHTML();
  const HTML = content ? edjsParser.parse(JSON.parse(content)) : null;
  return (
    <article className="prose prose-md max-w-3xl mx-auto mt-8">
      <div>{HTML ? Parser().parse(HTML.join('')) : 'Brak treści postu...'}</div>
    </article>
  );
};

export default NewsBody;
