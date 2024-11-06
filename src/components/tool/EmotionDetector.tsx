'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function EmotionDetector({ description, title }: { description: string, title: string }) {
  const [emotion, setEmotion] = useState({ label: '', score: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const text = description.concat(title);

  const query = async () => {
    setIsLoading(true);
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      { text },
      { headers: { Authorization: "Bearer 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" } }
    );
    const result = response.data;

    // Find the label with the highest score
    const topLabel = result.reduce((acc:any, curr:any) => (acc.score > curr.score ? acc : curr), result[0]);

    return { label: topLabel.label, score: topLabel.score };
  }

  useEffect(() => {
    if (text) {
      query().then((topEmotion) => {
        setEmotion(topEmotion);
        setIsLoading(false);
      });
    }
  }, [text]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex lg:flex-row flex-col lg:gap-2'> <p>It appears to be a </p><p className='font-bold'>{emotion.label}</p> <p>content with a confidence score of</p> <p className='font-bold'>{emotion.score.toFixed(2)}</p></div>
      )}
    </div>
  );
}
