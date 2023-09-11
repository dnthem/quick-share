'use client';

import { convertBytesToMB } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ShowImageProps = {
  image?: string,
  imageType?: string,
  imageName?: string
}

function ShowImage({ image, imageType, imageName }: ShowImageProps) {
  return (
    <div>
      <Image src={`data:${imageType};base64, ${image}`} alt={imageName || 'image'} width={500} height={500} className="object-contain" />
      <div className="bottom-0 bg-white text-center w-full">
        <p>
          Type: {imageType}<br />
          Name: {imageName}<br />
          Size: {convertBytesToMB(image?.length)} mb<br />
          <a
            className="text-blue-500 hover:underline"
            href={`data:${imageType};base64, ${image}`}
            download={`${imageName}.${imageType}`}>
            Download
          </a>

        </p>
      </div>
    </div>
  )
}


function Download({ id }: { id: string }) {
  const [imageName, setImageName] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null); // ['png', 'jpg', 'jpeg'
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await fetch(`/api/download/?id=${id}`, {
          method: 'GET'
        });

        const resJSON = await res.json();
        if (resJSON.error) {
          setError(resJSON.error);
          return;
        } else {
          const imageInfo = resJSON.imageInfo;
          setImageType(imageInfo.type);
          setImage(imageInfo.image);
          setImageName(imageInfo.filename);
        }


      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }

    };
    getImage();
    return () => {
      setImage(null);
    }
  }
    , [id]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="text-blue-500 hover:underline">Back to home</Link>
      {image && imageType && imageName && <ShowImage
        image={image}
        imageType={imageType}
        imageName={imageName}
      />}

      {
        error && <p className="text-red-500">{error}</p>
      }
    </div>

  )
}

export default Download