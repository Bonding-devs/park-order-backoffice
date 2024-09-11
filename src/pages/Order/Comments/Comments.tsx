import { CommentEditor } from './CommentEditor';

interface CommentsProps {
  workOrderId: string;
}

export const Comments: React.FC<CommentsProps> = ({workOrderId}) => {
  return (
    <>
      <div className="">
        <div className="mb-2 text-gray-900 block text-sm font-medium leading-6"> Comments</div>
        <div className="custom-border mb-8 border-t" />
        <CommentEditor workOrderId={workOrderId}/>
      </div>
    </>
  );
};
