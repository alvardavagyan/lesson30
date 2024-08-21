import { IComment, IPost } from '../helpers/types';
import { BASE } from '../helpers/default';
import { addComment, handlePostReaction } from '../helpers/api';
import { Preview } from './Preview';
import { useState } from 'react';

interface Props {
    posts: IPost[]
    onUpdate?: (id: number) => void
}

export function Gallery({ posts, onUpdate }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<IPost | null>(null)

    const handleReaction = (id: number) => {
        handlePostReaction(id)
            .then(() => {
                if (onUpdate) {
                    onUpdate(id)
                }
            })
    }

    const handleAddComment = (postId: number, postComment: string) => {
        addComment(postId, postComment)
            .then((response) => {
                if (currentPost && response.payload) {
                    setCurrentPost({
                        ...currentPost,
                        comments: [...currentPost.comments,  response.payload as IComment],
                        
                    })
                }
                
            })

    }
    return (
        <div className='list'>
            {posts.map(post => (
                <div key={post.id}>
                    <div className='post'>
                        <img src={BASE + post.picture} alt={post.title} />
                        <div className="cover-post"></div>
                        <img
                            onClick={() => handleReaction(post.id)}
                            src={
                                !post.isLiked
                                    ? "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png"
                                    : "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_pink.png"
                            }
                            alt="like-button"
                            className='like-button'
                        />
                    </div>

                    <p>{post.title}</p>

                    <p>
                        <small
                            onClick={() => {
                                setOpen(true)
                                setCurrentPost(post)
                            }

                            }
                            title={post.likes.map(e => e.name).join(', ')}
                        >
                            {post.likes.length} likes,
                        </small>

                        <small
                            onClick={() => {
                                setOpen(false)
                                setCurrentPost(null)
                            }}
                            title={post.comments.map(e => e.user.name).join(', ')}
                        >
                            {post.comments.length} comments
                        </small>
                    </p>
                </div>
            ))}
            {currentPost && (
                <Preview
                    open={open}
                    onClose={() => setOpen(false)}
                    post={currentPost}
                    onPostComment={handleAddComment}
                />
            )}
        </div>
    );
}
