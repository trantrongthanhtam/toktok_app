import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { Video } from './../types';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes }, isShowingOnHome }) => {

  if(!isShowingOnHome) {
    return (
      <div className='flex flex-col border-b-2 border-gray-200 pb-6 md:pl-6 w-[100%]'>
        <div>
          <div className='p-2 cursor-pointer font-semibold rounded '>
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
                className='w-[75vw] lg:w-[700px] h-[300px] md:h-[400px] lg:h-[528px] rounded-2xl cursor-pointer bg-gray-100'
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
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${postedBy?._id}`}>
              <>
                <Image
                  width={50}
                  height={50}
                  className=' rounded-full'
                  src={postedBy?.image}
                  alt='user-profile' 
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div className='flex items-center md:block'>
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
          </div>
        </div>
        <div className='cursor-pointer pr-5 md:pl-5 mb-2'>
            <Link href={`/detail/${_id}`}>
              <p className='mt-2 font-normal'>{caption}</p>
            </Link>
        </div>
      </div>

      <div className='lg:ml-3 flex relative'>
        <div
          className='rounded-3xl'
        >
          <Link href={`/detail/${_id}`}>
            <video
              loop
              controls
              src={video.asset.url}
              className='w-[72vw] lg:w-[700px] h-[300px] md:h-[400px] lg:h-[528px] rounded-2xl cursor-pointer bg-gray-100'
            >Your browser does not support the video tag.</video>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;