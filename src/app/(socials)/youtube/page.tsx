'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaYoutube, FaSpinner } from 'react-icons/fa';
import EmotionDetector from '@/components/tool/EmotionDetector';
import CategoryDetector from '@/components/tool/CategoryDetector';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const YoutubePageContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');
  const date = searchParams.get('date');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 10, // Limit to 10 results for demonstration
          q: keyword,
          publishedAfter: `${date}:00Z`,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY2, // Replace with your actual YouTube API key
        },
      });
      setVideos(response.data.items); // Set the video items array
    } catch (error) {
      console.error('Error fetching YouTube search results:', error);
      setVideos([]); // Set an empty array in case of errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      searchVideos();
    }
  }, [keyword]);

  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold flex flex-row items-center justify-center gap-4'>
        <FaYoutube className='w-10 h-10 text-red-700' />
        <p>YouTube Monitoring</p>
      </h1>
      <div className='text-xl flex flex-row gap-1'>
        <p className='font-bold'>Searched Keyword:</p> <p>{keyword}</p>
      </div>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <FaSpinner className='animate-spin text-4xl' />
        </div>
      ) : (
        <div>
          {(videos as { snippet: any; id: { videoId: string } }[]).map((video) => (
            <Card key={video.id.videoId} className='my-4 flex p-4 space-x-4 bg-gray-300 border-black'>
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle>{video.snippet.title}</CardTitle>
                </CardHeader>

                <CardContent className='px-6 space-y-4'>
                  <CardDescription>
                    <p>{video.snippet.description}</p>
                    <p>
                      Date:
                      {new Date(video.snippet.publishedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                      })}
                    </p>
                  </CardDescription>
                  <div>
                    <EmotionDetector description={video.snippet.description} title={video.snippet.title} />
                    <CategoryDetector description={video.snippet.description} title={video.snippet.title} />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const YoutubePage = () => {
  return (
    <Suspense fallback={<div>Loading YouTube page...</div>}>
      <YoutubePageContent />
    </Suspense>
  );
};

export default YoutubePage;
