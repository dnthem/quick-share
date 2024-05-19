'use client';
import Image from "next/image";
import { ShowImageProps } from "./DownloadSection";

export function ShowImage({ image, type, filename, size }: ShowImageProps) {
  return (
    <div className='flex flex-col items-center'>
      <Image
        onContextMenu={(e) => e.preventDefault()}
        src={`data:${type};base64, ${image}`}
        alt={filename || 'image'}
        width={400}
        height={400}
        style={{ objectFit: 'contain' }}/>
      <div>
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
