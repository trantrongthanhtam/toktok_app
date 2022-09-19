import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils'
import Link from 'next/link'
import useAuthStore from '../../store/authStore'
import { useRouter } from 'next/router'

const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const router = useRouter();
    const { searchTerm }: any = router.query;
    const { allUsers } = useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='w-full'>
            <div className='flex gap-5 mb-5 mt-2 md:mt-4 border-b-2 border-gray-200 bg-white w-full'>
                <p className={`text-xl font-bold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)} >Accounts</p>
                <p className={`text-xl font-bold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)} >Videos</p>
            </div>
            {isAccounts ? (
                <div className='md:mt-5'>
                    {searchAccounts.length > 0 ? (
                        searchAccounts.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className="flex cursor-pointer gap-3 p-2 font-semibold rounded border-b-2 border-gray-200">
                                    <div className='w-10 h-10'>
                                        <Image
                                            src={user.image}
                                            width={34}
                                            height={34}
                                            className="rounded-full"
                                            alt="user profile"
                                            layout="responsive"
                                        />
                                    </div>
                                    <div className="xl:block">
                                        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                                            {user.userName.replaceAll(" ", "")}
                                            <GoVerified className='text-blue-400' />
                                        </p>
                                        <p className='capitalize text-gray-400 text-xs'>{user.userName}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <NoResults text={`No account results for "${searchTerm}"`} />
                    )}
                </div>
            ) : (
                <div className='md:mt-5 flex flex-wrap gap-6 md:justify-start'>
                    {videos.length ? (
                        videos.map((video: Video, idx) => (
                            <VideoCard post={video} key={idx} isShowingOnHome/>
                        ))
                    ) : <NoResults text={`No video results for "${searchTerm}"`} />}
                </div>
            )

            }
        </div>
    )
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { videos: res.data }
    }
}

export default Search