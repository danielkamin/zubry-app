import SubHeader from 'src/components/simple/SubHeader';

const GoogleMaps = ({ src, textInfo }: { src: string; textInfo: string }) => (
  <>
    <SubHeader textColor="gray-800">{textInfo}</SubHeader>
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-screen h-v50 border-0 flex justify-center relative">
        <iframe src={src} className="w-screen absolute bottom-0 h-full" allowFullScreen loading="lazy"></iframe>
      </div>
    </div>
  </>
);
export default GoogleMaps;
