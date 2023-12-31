'use client';
import { useState } from "react";

// ImageForm.tsx
export function ImageForm({ onSubmit }: { onSubmit: (id: string) => void; }) {
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
    <div className="flex flex-col items-center justify-center rounded-xl bg-primary min-w-[400px] min-h-[400px]">
      <h2 className="text-white p-4 text-xl ">Enter your image ID</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="dragon-slayer-upgrade"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2" />
          <button type="submit" className="bg-accent text-white px-4 py-2 rounded-md mt-4 hover:bg-secondary">Submit</button>
        </div>
      </form>
    </div>
  );
}
