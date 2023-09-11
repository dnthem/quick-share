'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

type UploadProps = {
  setImageID: React.Dispatch<React.SetStateAction<string | null>>
}

function Upload({setImageID} : UploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
      console.log(files[0].name);
    }
  }

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!image) {
      return alert('Please select an image');
    }
    try {
      const body = new FormData();
      body.append('image', image);
  
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: body
      });
  
      const message = await res.json();
      if (message.error) {
        setError(message.error);
        setMessage(null);
        return;
      } else {
        setImageID(message.id);
        setMessage(message.message);
        setError(null);
      }
    } catch (error : unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    
    
  }
  return (
    <form
     onSubmit={handleSubmit}
     className="flex flex-col items-center justify-center">
      <input type="file" name="image" accept="image/*"  onChange={handleFileChange}/>
      
      <button 
        type='submit' 
        className="bg-secondary text-white px-4 py-2 rounded-md mt-4 hover:bg-primary">
          Upload
      </button>

      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      
    </form>
  )
}

export default Upload