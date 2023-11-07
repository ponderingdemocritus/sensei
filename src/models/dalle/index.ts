import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function generateImage(prompt: string, retries = 1) {
  return new Promise((resolve, reject) => {
    const attemptGeneration = async (retryCount: number) => {
      try {
        const image = await openai.images.generate({
          model: "dall-e-3",
          prompt:
            "make a voxel art magic matrix image from this story, only use the beasts, obstacles names, put it in a dark fantasy setting, avoid copyright, avoid typing text on the image : " +
            prompt,
        });
        console.log(image.data);
        resolve(image.data); // Resolve the promise with the image data.
      } catch (error: any) {
        console.error(error);
        if (error.message.includes("Rate limit exceeded") && retryCount > 0) {
          console.log(`Rate limit hit. Retrying in 60 seconds...`);
          setTimeout(() => attemptGeneration(retryCount - 1), 60000); // Retry after 60 seconds
        } else {
          reject(error); // Reject the promise if it's not a rate limit error or retries are exhausted.
        }
      }
    };

    attemptGeneration(retries);
  });
}
