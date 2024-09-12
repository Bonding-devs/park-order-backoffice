import { CommentsProvider } from '../../../context/CommentsContext';
import { CommentEditor } from './CommentEditor';
import { CommentsList } from './CommentsList';

interface CommentsProps {
  workOrderId: string;
}

export const Comments: React.FC<CommentsProps> = ({ workOrderId }) => {
  return (
    <>
      <div className="text-gray-900 mb-2 block text-sm font-medium leading-6">
        Comments
      </div>
      <div className="custom-border mb-8 border-t" />
      <div className="flex flex-col items-center ">
        <div className="w-full">
          <CommentsProvider>
            <CommentEditor workOrderId={workOrderId} />
            <CommentsList workOrderId={workOrderId} />
          </CommentsProvider>
        </div>
      </div>
    </>
  );
};
