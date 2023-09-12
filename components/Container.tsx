'use client';

import Link from "next/link";
import { Upload } from ".";
import { useState } from "react";
type ContainerProps = {
  image?: string
}

function Container({ image }: ContainerProps) {
  const [imageID, setImageID] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => {
    navigator.clipboard.writeText(`${window.location.href}/download?id=${imageID}`);
    setIsClicked(true);
  }
  return (
    <div className="bg-white rounded-md p-4 text-center">
      <Upload setImageID={setImageID} />
      {imageID &&
        <>
          <span>
            Your image is ready to download &nbsp;
            <Link
              className=" text-blue-500 hover:underline"
              href={`download?id=${imageID}`} >
              here
            </Link>
          </span>
          <br />
          or click this link to copy: &nbsp;
          <span onClick={handleClick} 
          className="text-blue-500 hover:underline cursor-pointer">
            {`${window.location.href}download?id=${imageID}`}
          </span>
          <br/>
          {
            isClicked && <span className="text-green-500">Copied!</span>
          }
        </>
      }




    </div>
  )
}

export default Container