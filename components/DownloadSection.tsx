'use client';

import { convertBytesToMB } from "@/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { IImages } from "@/lib/models/Images";
import { ShowImage } from "./ShowImage";
import { ImageForm } from "./ImageForm";
import ErrorUI from "./UI/ErrorUI";

export type ShowImageProps = {
  image: string,
  type: string,
  filename: string,
  size: number
};


function DownloadPage({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<IImages | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleImageIdSubmit = (imageId: string) => {
    setLoading(true);
    setImageInfo(null);
    setError('');
    router.push(`/download?id=${encodeURIComponent(imageId.toLowerCase())}`);
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/download/?id=${id}`, {
          method: 'GET'
        });

        const resJSON = await res.json();
        if (resJSON.error) {
          throw new Error(resJSON.error);
        } else {
          const imageInfo = resJSON.imageInfo as IImages;
          setImageInfo(imageInfo);
        }


      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }

    };
    if (id)
      getImage();
  }, [id]);

  return (
    <>
      <ErrorUI key={id} error={error} />
      {imageInfo && <ShowImage
        image={imageInfo?.image}
        type={imageInfo?.type}
        filename={imageInfo?.filename}
        size={convertBytesToMB(imageInfo?.size)}
      />}
      <div className="p-4">
        <ImageForm onSubmit={handleImageIdSubmit} />
      </div>
    </>
  );
}

export default DownloadPage