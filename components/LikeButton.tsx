import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'

interface IProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[];
}

const LikeButton = ({likes, handleDislike, handleLike}:IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();
    const filterLikes = likes?.filter((like) => like._ref === userProfile?._id)

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true)
        } else {
            setAlreadyLiked(false);
        }
    }, [filterLikes, likes])

    return (
        <div className="flex gap-6">
            <div className="mt-4 flex justify-center items-center cursor-pointer">
                {alreadyLiked ? (
                    <div className='bg-primary rounded-full p-2 md:p-2 text-[#F51997]' onClick={handleDislike}>
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                ) : (
                    <div className='bg-primary rounded-full p-2 md:p-2' onClick={handleLike}>
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                )}
                <p className="ml-2 text-md font-semibold">{likes?.length | 0}{ (!(likes?.length)||likes?.length == 1) ?' like': ' likes'}</p>
            </div>
        </div>
    )
}

export default LikeButton