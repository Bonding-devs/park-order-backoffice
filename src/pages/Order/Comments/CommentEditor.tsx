import { useEffect, useState } from 'react';
import { CustomTextarea } from '../../../components/CustomInput/CustomTextarea';
import { useComment } from '../../../modules/Comments/useComment';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

export enum CommentType {
  CREATE,
  UPDATE,
}

interface CommentEditorProps {
  type?: CommentType;
  workOrderId: string;
}

export const CommentEditor: React.FC<CommentEditorProps> = ({
  type = CommentType.CREATE,
  workOrderId,
}) => {
  const { onSubmit, error, setError, loading, commentText, setCommentText} = useComment();
  const {user} = useAuth();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = commentText.trim();
    if (!text) {
      toast.warning('Comment cannot be empty');
      return;
    }
    onSubmit({ userId: user.id, text, workOrderId });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);
  const initial = user.firstName[0];
  const buttonText = type === CommentType.CREATE ? 'Post' : 'Update';
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center ">
      <div className=" w-full md:w-3/4">
        <div className="flex w-full items-start justify-center">
          <InitialName initial={initial} />
          <div className="flex-1 space-y-2">
            <CustomTextarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />
            <input
              type="submit"
              value={loading ? buttonText + 'ing...' : buttonText}
              disabled={loading}
              className={`w-full rounded bg-blue-500 p-2 text-white ${
                loading
                  ? 'cursor-not-allowed bg-opacity-50'
                  : 'hover:bg-opacity-90'
              }`}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

interface InitialNameProps {
  initial: string;
}
export const InitialName: React.FC<InitialNameProps> = ({ initial }) => {
  return (
    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[20px]">
      {initial}
    </div>
  );
};
