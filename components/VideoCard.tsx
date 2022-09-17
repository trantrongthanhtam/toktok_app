import React, { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BsPlay } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { Video } from './../types';
import { BASE_URL } from '../utils';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes }, isShowingOnHome }) => {

  if(!isShowingOnHome) {
    return (
      <div className='flex flex-col border-b-2 border-gray-200 pb-6 md:pl-6'>
        <div>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
            
            <div>
              <Link href={`/detail/${_id}`}>
                <p className='mt-2 font-normal '>{caption}</p>
              </Link>
            </div>
          </div>
        </div>

        <div className='flex gap-4'>
          <div
            className='rounded-3xl'
          >
            <Link href={`/detail/${_id}`}>
              <video
                loop
                controls
                src={video.asset.url}
                className='lg:w-[700px] h-[300px] md:h-[400px] lg:h-[528px] w-[270px] rounded-2xl cursor-pointer bg-gray-100'
              >Your browser does not support the video tag.</video>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6 md:pl-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${postedBy?._id}`}>
              <>
                <Image
                  width={1}
                  height={1}
                  className=' rounded-full'
                  src={postedBy?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className='mt-2 font-normal '>{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          className='rounded-3xl'
        >
          <Link href={`/detail/${_id}`}>
            <video
              loop
              controls
              src={video.asset.url}
              className='lg:w-[700px] h-[300px] md:h-[400px] lg:h-[528px] w-[270px] rounded-2xl cursor-pointer bg-gray-100'
            >Your browser does not support the video tag.</video>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;