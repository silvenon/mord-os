import { Routes, Route, Link, useParams } from 'react-router-dom'
import Window from './Window'
import useFetch from '../hooks/useFetch'

export default function Reader() {
  return (
    <Window title="Reader" rootPathname="/reader">
      <div className="overflow-y-auto">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="posts/:postId" element={<Post />} />
        </Routes>
      </div>
    </Window>
  )
}

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

function PostsList() {
  const { data: posts } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
  )
  const { data: comments } = useFetch<Comment[]>(
    'https://jsonplaceholder.typicode.com/comments',
  )

  return (
    <div className="p-4 divide-y divide-slate-200">
      {posts?.map((post) => {
        const postComments = comments?.filter(
          (comment) => comment.postId === post.id,
        )
        return (
          <article
            key={post.id}
            className="prose prose-sm py-8 first:pt-0 last:pb-0"
          >
            <h1>{post.title}</h1>
            <div className="-mt-5 text-slate-500">
              {postComments ? (
                <small>
                  {postComments.length === 1
                    ? '1 comment'
                    : `${postComments.length} comments`}
                </small>
              ) : (
                ' ' // non-breaking space to take up space before comments are fetched
              )}
            </div>
            <p>{post.body}</p>
            <Link to={`posts/${post.id}`}>Read more</Link>
          </article>
        )
      })}
    </div>
  )
}

function Post() {
  const { postId } = useParams()
  const { data: post } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )
  const { data: comments } = useFetch<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  )

  if (!post) return null

  return (
    <>
      <div className="prose p-4">
        <article>
          <h1>{post.title}</h1>
          {post.body.split('\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <h2>Comments</h2>
      </div>
      {comments?.length ? (
        <ul role="list" className="px-4 divide-y divide-gray-200">
          {comments.map((comment) => (
            <li key={comment.id} className="relative bg-white py-5">
              <div>
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 truncate">
                  {comment.email}
                </p>
                <p className="text-sm text-gray-500 truncate">{comment.name}</p>
              </div>
              <div className="mt-1">
                <p className="text-sm text-slate-600">{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
