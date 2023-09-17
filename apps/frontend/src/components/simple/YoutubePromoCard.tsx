import { extractIdFromYoutubeUrl } from '@/utils';

const YoutubePlayer = ({ url }) => (
  <div className="xl:h-96 w-full md:h-80 h-64">
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${extractIdFromYoutubeUrl(url)}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Mecz"
    />
  </div>
);

export default YoutubePlayer;
