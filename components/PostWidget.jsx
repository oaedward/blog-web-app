/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

import { grpahCMSImageLoader } from '../util'
import { getSimilarPosts, getRecentPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result)
      })
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result)
      })
    }
  }, [slug])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-8 mb-4'>
      <h3 className='text-xl mb-4 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className='flex items-center w-full mb-2'>
          <div className='w-16 flex-none'>
            <Image
              loader={grpahCMSImageLoader}
              alt={post.title}
              height='50px'
              width='50px'
              unoptimized
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 text-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className='text-xs' key={index}>
              <span
                className={`cursor-pointer block ${
                  index === relatedPosts.length - 1 ? 'border-b-0' : 'border-b'
                } pb-3 mb-3`}
              >
                {post.title}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
