import { randomWords } from "@/constants";
export function getExtension(fileName: string): string | undefined {
  return fileName.split('.')[1];
}

export function getFileName(fileName: string): string | undefined {
  return fileName.split('.')[0];
}

export function convertBytesToMB(bytes: number | undefined): number {
  if (!bytes) {
    return 0;
  }
  return parseFloat((bytes / 1_000_000).toFixed(2));
}

/**
 * Generates a random string from three random words
 * @returns 
 */
export function getRandomThreeWords(): string {
  // geerate a random string from common word array that includes 3 words
  const randomIndices : Array<number> = [];
  while (randomIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }
  return randomIndices.map(index => randomWords[index]).join('-');
}

export async function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then(res => res.json());
}