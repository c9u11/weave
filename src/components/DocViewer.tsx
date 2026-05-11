import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocViewerProps {
  source: string;
}

export default function DocViewer({ source }: DocViewerProps) {
  return (
    <article className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </article>
  );
}
