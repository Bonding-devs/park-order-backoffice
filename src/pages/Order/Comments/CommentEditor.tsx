import { useEffect } from 'react';
import { CustomTextarea } from '../../../components/CustomInput/CustomTextarea';
import { useCreateComment } from '../../../modules/Comments/useCreateComment';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { InitialName } from '../../../common/InitialName';

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
  const { onSubmit, error, setError, loading, commentText, setCommentText } =
  useCreateComment();
  const { user } = useAuth();

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
    <form onSubmit={handleSubmit}>
      <div className="flex w-full items-start justify-center">
        <InitialName initial={initial} />
        <div className="mr-3"/>
        <div className="flex-1 space-y-2 flex flex-col">
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
            className={`self-end rounded bg-blue-500 px-6 py-2 text-white ${
              loading
                ? 'cursor-not-allowed bg-opacity-50'
                : 'hover:bg-opacity-90'
            }`}
          />
        </div>
      </div>
    </form>
  );
};


