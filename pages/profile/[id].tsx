import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils'

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedPosts: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const {user, userVideos, userLikedPosts} = data;
    const [videosList, setVideosList] = useState<Video[]>([])

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    const likes = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
        if (showUserVideos) {
            setVideosList(userVideos)
        } else {
            setVideosList(userLikedPosts)
        }
    }, [showUserVideos, userLikedPosts, userVideos])

    return (
        <>
            <div className="flex gap-2 items-center md:gap-10 mb-4 bg-white w-full">
                <div className='w-16 h-16 md:w-28 md:h-28'>
                    <Image
                        src={user.image}
                        width={120}
                        height={120}
                        className="rounded-full"
                        alt="user profile"
                        layout="responsive"
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(" ", "")}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 md:text-xl'>{user.userName}</p>
                </div>
            </div>
            <div>
                <div className='flex gap-5 mb-10 mt-2 md:mt-4 border-b-2 border-gray-200 bg-white w-full'>
                    <p className={`text-xl font-bold cursor-pointer mt-2 ${videos}`} onClick={()=>setShowUserVideos(true)} >Videos</p>
                    <p className={`text-xl font-bold cursor-pointer mt-2 ${likes}`} onClick={()=>setShowUserVideos(false)} >Likes</p>
                </div>
                <div className='flex gap-6 flex-wrap md:justify-center'>
                    {videosList.length > 0 ? (
                        videosList.map((post:Video, idx:number) => (
                            <VideoCard post={post} key={idx} />
                        ))
                    ) : <NoResults text={`No ${showUserVideos? '' : 'liked'} videos yet.`} />}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const {data} = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: {data: data}
    }
}

export default Profile