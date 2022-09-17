import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { FaTimes } from 'react-icons/fa'
import { BsFillPlayFill } from 'react-icons/bs';

import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';


interface IProps {
    postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [comment, setComment] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);
    const videoRef = useRef(null);
    const router = useRouter();
    const {userProfile}:any = useAuthStore();

    const handleLike = async (like: boolean) => {
        if(userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            })

            setPost({...post, likes: data.likes})
        }
    }

    const addComment = async (e:any) => {
        e.preventDefault();

        if(userProfile && comment) {
            setIsPostingComment(true);

            const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId: userProfile._id,
                comment
            });

            setPost({...post, comments: data.comments})
            setComment("");
            setIsPostingComment(false);
        }
    }

    if (!post) return null;

    return (
        <div className='flex w-full absolute left-0 top-10 bg-white flex-wrap lg:flex-nowrap '>
            <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
                <div className="absolute top-8 left-2 lg:left-6 flex gap-6 z-50">
                    <p className='cursor-pointer' onClick={() => router.back()}>
                        <FaTimes className='text-white text-[35px] cursor-pointer' />
                    </p>
                </div>
                <div className='relative'>
                    <div className='lg:h-[95vh] h-[60vh]'>
                        <video controls autoPlay loop ref={videoRef} src={post.video.asset.url} className="h-full cursor-pointer" ></video>
                    </div>
                </div>
            </div>
            <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                <div className="lg:mt-20 mt-10">
                    <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
                        <div className='ml-10 md:w-20 md:h-20 w-16 h-16'>
                            <Link href={`/profile/${postDetails?.postedBy?._id}`}>
                                <>
                                    <Image
                                        width={1}
                                        height={1}
                                        className=' rounded-full'
                                        src={postDetails?.postedBy?.image}
                                        alt='user-profile'
                                        layout='responsive'
                                    />
                                </>
                            </Link>
                        </div>
                        <div>
                            <Link href={`/profile/${postDetails?.postedBy?._id}`}>
                                <div className='flex flex-col gap-1'>
                                    <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                                        {postDetails?.postedBy.userName}{' '}
                                        <GoVerified className='text-blue-400 text-md' />
                                    </p>
                                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                        {postDetails?.postedBy.userName}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <p className='px-10 text-lg mt-2 font-normal text-gray-600'>{postDetails.caption}</p>
                    <div className="mt-10 px-10 mb-3">
                        {userProfile && (
                            <LikeButton handleLike={() => handleLike(true)} handleDislike={() => handleLike(false)} likes={post.likes}/>
                        )}
                    </div>
                    <Comments comment={comment} setComment={setComment} addComment={addComment} comments={post.comments} isPostingComment={isPostingComment}/>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);


    return {
        props: {
            postDetails: data
        }
    }
}

export default Detail