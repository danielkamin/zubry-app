import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const PreviewModeBanner = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const getPreviewMode = useCallback(() => {
    checkPreviewMode() ? setShow(true) : setShow(false);
  }, [setShow]);

  useEffect(() => {
    getPreviewMode();
  }, [getPreviewMode]);

  const checkPreviewMode = () => {
    return router.isPreview;
  };

  const exitPreviewMode = async () => {
    await axios.post('/api/exit-preview');
    router.reload();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="font-sans fixed top-0 left-0 w-full text-sm text-gray-100 border border-purple-600 bg-purple-600 flex z-50">
      <div className="p-2 flex w-full justify-between max-w-2xl md:max-w-7xl mx-auto px-4">
        <p>Tryb podglądu jest włączony. Możesz teraz zobaczyć nieopublikowane treści.</p>
        <div onClick={exitPreviewMode}>
          <p className="font-bold cursor-pointer">Wyłącz tryb podglądu</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewModeBanner;
