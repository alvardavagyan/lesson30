import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IPost } from '../helpers/types';
import { BASE, DEF } from '../helpers/default';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  onClose: () => void;
  post: IPost;
  onPostComment: (postId: number, postComment: string) => void
}

export const Preview = ({ open, onClose, post, onPostComment }: IProps) => {
  const [newComment, setNewComment] = useState<string>("")

  const handleAdd = () => {
    onPostComment(post.id, newComment)
    setNewComment("")
    console.log(newComment)
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          ...style,
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <img
          src={post.picture ? BASE + post.picture : DEF}
          className='modal-pic'
        />
        <div>
          <strong>Your post title: </strong><p>{post.title}</p>
          <strong>Your post likes: </strong><p>{post.likes.length} </p>
          <strong>Your post comments: </strong><p>{post.comments.length} </p>
        </div>

        <div className="d-flex justify-content-end" style={{ width: '100%' }}>
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-0 border">
              <strong>Like List:</strong>
              <div className="card-body p-4">
                {post.likes.map(like => (
                  <div key={like.id} className="d-flex align-items-end mb-2">
                    <img
                      className="likes-pic"
                      src={like.picture ? BASE + like.picture : DEF}

                      style={{ marginRight: '20px' }}
                    />
                    <p className="mb-0">
                      <Link className="link" to={'/profile/' + like.id}>  <strong>{like.name} {like.surname}</strong></Link>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end" style={{ width: '100%' }}>
          <div className="col-md-4 col-lg-6">
            <div className="card shadow-0 border">
              <div className="card-body p-4">
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="form-control"
                    placeholder="Type comment..."
                  />
                  <button onClick={handleAdd} className="btn btn-outline-primary mt-2">
                    Add comment
                  </button>
                </div>
                <strong>Comment List:</strong>

                {post.comments.map((comment, id) => (
                  <div key={id} className="d-flex align-items-start mb-2">
                    <img
                      className="likes-pic"
                      src={comment.user.picture ? BASE + comment.user.picture : DEF}
                      style={{ marginRight: '20px' }}
                    />
                    <p className="mb-0">
                      <strong>{comment.user.name} says: {comment.content}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
