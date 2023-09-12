'use client';

import { convertBytesToMB } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { IImages } from "@/lib/models/Images";

type ShowImageProps = {
  image: string,
  type: string,
  filename: string,
  size: number
}


function ShowImage({ image, type, filename, size }: ShowImageProps) {
  return (
    <div>
      <Image onContextMenu={(e) => { e.preventDefault() }} src={`data:${type};base64, ${image}`} alt={`${filename}` || 'image'} width={400} height={400} className="object-contain" />
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
  )
}


function Download({ id }: { id: string }) {
  const [Loading, setLoading] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<IImages | null>(null);
  const [error, setError] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

  const router = useRouter();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) {
      setError('Please enter image id');
      return;
    }
    router.push(`/download?id=${inputText}`);
  }

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

    return () => {
      setImageInfo(null);
      setError('');
      setLoading(false);
    }
  }
    , [id]);


  return (
    <>
      {
        Loading ? (<p className="text-blue-500">Loading...</p>) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            {imageInfo &&
              <ShowImage
                image={imageInfo.image}
                type={imageInfo.type}
                filename={imageInfo.filename}
                size={convertBytesToMB(imageInfo.size)}
              />
            }

            {
              error && <p className="text-red-500">{error}</p>
            }

            {
              !imageInfo &&
              <div className="flex flex-col items-center justify-center rounded-xl bg-primary w-[400px] h-[400px]">
                <h2 className="text-white p-4 text-xl ">Enter your image ID</h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Enter image id"
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      className="border-2 border-gray-300 rounded-md p-2"
                    />
                    <button type="submit"
                      className="bg-accent text-white px-4 py-2 rounded-md mt-4 hover:bg-secondary"
                    >Submit</button>
                  </div>
                </form>
              </div>
            }
          </div>
        )
      }

    </>


  )
}

export default Download