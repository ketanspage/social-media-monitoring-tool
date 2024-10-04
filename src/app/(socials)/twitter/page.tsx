'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaTwitter, FaSpinner } from 'react-icons/fa';
import EmotionDetector from '@/components/tool/EmotionDetector';
import CategoryDetector from '@/components/tool/CategoryDetector';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TwitterPageContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');
  const dateString = searchParams.get('date'); // Assuming the date is received in the format "2024-02-25T23:29"

  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = dateString ? new Date(dateString).toISOString().slice(0, 10) : null;

  const searchTweets = async () => {
    setIsLoading(true);
    try {
      // Format the date string to "YYYY-MM-DD"
      const response = await axios.get(`https://twitter154.p.rapidapi.com/search/search`, {
        params: {
          query: keyword,
          section: 'top',
          min_retweets: '1',
          min_likes: '1',
          limit: '5',
          start_date: formattedDate, // Pass the formatted date as the start_date parameter
          language: 'en',
        },
        headers: {
          'X-RapidAPI-Key': 'ac3b8bdd75msh8c109c3b8640283p15cf89jsne7bc24580576',
          'X-RapidAPI-Host': 'twitter154.p.rapidapi.com',
        },
      });
      const tweetData = response.data.results;
      const tweetList = tweetData.slice(0, 5).map((tweet: any) => ({
        creation_date: tweet.creation_date,
        text: tweet.text,
      }));
      setTweets(tweetList);
    } catch (error) {
      console.error('Error fetching Twitter search results:', error);
      setTweets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      searchTweets();
    }
  }, [keyword]);

  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold flex flex-row items-center justify-center gap-4'>
        <FaTwitter className='w-10 h-10 text-blue-700' />
        <p>Twitter Search</p>
        {formattedDate}
      </h1>
      <div className='text-xl flex flex-row gap-1'>
        <p className='font-bold'>Searched Keyword:</p>
        <p>{keyword}</p>
      </div>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <FaSpinner className='animate-spin text-4xl' />
        </div>
      ) : (
        <div className='space-y-4'>
          {(tweets as { creation_date: any; text: string }[]).map((tweet, index) => (
            <Card key={index} className='p-4 gap-4 bg-gray-300'>
              <div>
                <div className='flex flex-row'>
                  <p className='font-bold'>Creation Date:</p> <p>{tweet.creation_date}</p>
                </div>
                <div className='flex flex-row'>
                  <p className='font-bold'>Content:</p> <p>{tweet.text}</p>
                </div>
              </div>
              <EmotionDetector description={tweet.text} title={tweet.text} />
              <CategoryDetector description={tweet.text} title={tweet.text} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const TwitterPage = () => {
  return (
    <Suspense fallback={<div>Loading Twitter page...</div>}>
      <TwitterPageContent />
    </Suspense>
  );
};

export default TwitterPage;
