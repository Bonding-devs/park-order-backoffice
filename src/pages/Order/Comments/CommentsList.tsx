import { useEffect } from 'react';
import { Loader } from '../../../common/LoaderPage/Loader';
import { useGetComments } from '../../../modules/Comments/useGetComments';
import { InitialName } from './CommentEditor';
import { toast } from 'react-toastify';
import { dateHelpers } from '../../../utils/dateHelpers';

interface CommentsListProps {
  workOrderId: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({ workOrderId }) => {
  const { comments, loading, error, setError, last, changePage } =
    useGetComments(workOrderId);
  const { getTime } = dateHelpers();

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <div className="mb-3" />
      {comments.map((comment) => {
        const initial = comment.user?.firstName?.charAt(0);
        const photo = comment.user?.photo?.path;
        const fullName = comment.user?.firstName + ' ' + comment.user?.lastName;
        return (
          <div
            className="custom-border space-y-2 border-b py-4"
            key={comment.id}
          >
            <div className="flex items-start">
              <InitialName initial={initial} photo={photo} />
              <div className="flex-1 space-y-1">
                <div className=" flex items-start">
                  <div className="flex-1 p-0 text-sm font-semibold leading-none">
                    {fullName}
                  </div>
                  <div className="text-gray-500 text-xs leading-none">
                    {getTime(comment.createdAt)}
                  </div>
                </div>
                <div>
                  {comment.text}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="self-center">{loading && <Loader />}</div>
      {!last && !loading && (
        <div className="flex justify-center">
          <button
            onClick={changePage}
            
            className=" mt-2 rounded bg-slate-100 px-4 py-1"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
