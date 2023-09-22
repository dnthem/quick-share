'use client';

import { convertBytesToMB } from "@/utils";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"
import { IImages } from "@/lib/models/Images";

type ShowImageProps = {
  image: string,
  type: string,
  filename: string,
  size: number
}


function ShowImage({ image, type, filename, size }: ShowImageProps) {
  const preventContextMenu = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  return (
    <div>
      <Image
        onContextMenu={preventContextMenu}
        src={`data:${type};base64, ${image}`}
        alt={filename || 'image'}
        width={400}
        height={400}
        className="object-contain"
      />
      <div className="bottom-0 bg-white text-center w-full">
        <p>
          File name: {filename}<br />
          Type: {type}<br />
          Size: {size.toString()}mb<br />
          <a
            className="text-blue-500 hover:underline text-4xl"
            href={`data:${type};base64, ${image}`}
            download={`${filename}.${type}`}>
            👉Download👈
          </a>
        </p>
      </div>
    </div>
  );
}

// ImageForm.tsx
function ImageForm({ onSubmit }: { onSubmit: (id: string) => void }) {
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) {
      alert('Please enter an image id');
      return;
    }
    onSubmit(inputText);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-primary w-[400px] h-[400px]">
      <h2 className="text-white p-4 text-xl ">Enter your image ID</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter image id"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <button type="submit" className="bg-accent text-white px-4 py-2 rounded-md mt-4 hover:bg-secondary">Submit</button>
        </div>
      </form>
    </div>
  );
}



function Download({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<IImages | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleImageIdSubmit = (imageId: string) => {
    router.push(`/download?id=${encodeURIComponent(imageId)}`);
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
          setError(resJSON.error);
          return;
        } else {
          const imageInfo = resJSON.imageInfo as IImages;
          setImageInfo(imageInfo);
        }


      } catch (err: unknown) {
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
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          {error && <p className="text-red-500">{error}!</p>}
          {imageInfo ? (
            <ShowImage
              image={imageInfo.image}
              type={imageInfo.type}
              filename={imageInfo.filename}
              size={convertBytesToMB(imageInfo.size)}
            />
          ) : (
            <ImageForm onSubmit={handleImageIdSubmit} />
          )}
          
        </div>
      )}
    </>
  );
}

export default Download