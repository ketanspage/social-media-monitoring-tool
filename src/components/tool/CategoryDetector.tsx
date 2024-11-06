'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default  function EmotionDetector({ description,title }: { description: string,title: string}) {
  const [category, setCategory] = useState({ label: '', score: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const text=description.concat(title);
  const query = async () => { 
    setIsLoading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify({"inputs": text,
        "parameters": {"candidate_labels": [ "politics",
        "legal",
        "food",
        "sports",
        "healthcare",
        "technology",
        "education",
        "finance",
        "entertainment",
        "travel"]}}),
      }
    );
    const result = await response.json();
    return {label:result.labels[0],score:result.scores[0]};
  }
  useEffect(() => {
    if (text) {
      query().then((topCategory) => {
        setCategory(topCategory);
        setIsLoading(false);
      });
    }
  }, [text]);
return (
  <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
        <div className='flex lg:flex-row flex-col lg:gap-2'> <p>Content best represents</p><p className='font-bold'>{category.label}</p> <p>domain with a confidence score of</p> <p className='font-bold'>{category.score.toFixed(2)}</p></div>
    )}
  </div>
);
}