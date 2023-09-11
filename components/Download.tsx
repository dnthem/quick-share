'use client';

import { convertBytesToMB } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

type ShowImageProps = {
  image?: string,
  imageType?: string,
  imageName?: string
}


function ShowImage({ image, imageType, imageName }: ShowImageProps) {

  return (
    <div>
      <Image onContextMenu={(e) => {e.preventDefault()}} src={`data:${imageType};base64, ${image}`} alt={imageName || 'image'} width={400} height={400} className="object-contain" />
      <div className="bottom-0 bg-white text-center w-full">
        <p>
          Type: {imageType}<br />
          Name: {imageName}<br />
          Size: {convertBytesToMB(image?.length)} mb<br />
          <a
            className="text-blue-500 hover:underline text-4xl"
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
  const [Loading, setLoading] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null); // ['png', 'jpg', 'jpeg'
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
          const imageInfo = resJSON.imageInfo;
          setImageType(imageInfo.type);
          setImage(imageInfo.image);
          setImageName(imageInfo.filename);
        }


      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }

    };
    getImage();
    return () => {
      setImage(null);
    }
  }
    , [id]);


  return (
    <>
      {
        Loading ? (<p className="text-blue-500">Loading...</p>) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
      {image && imageType && imageName && 
      <ShowImage
        image={image}
        imageType={imageType}
        imageName={imageName}
      />
      }

      {
        error && <p className="text-red-500">{error}</p>
      }

      {
        !image &&
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
              className="bg-secondary text-white px-4 py-2 rounded-md mt-4 hover:bg-primary"
            >Submit</button>
          </div>
        </form> 
      }
    </div>
        )
      }
    
    </>
    

  )
}

export default Download