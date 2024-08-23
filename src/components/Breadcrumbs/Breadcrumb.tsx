import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
  baseName?: string;
  reDirectionUrl?: string;
  render?: any;
}
const Breadcrumb = ({
  pageName,
  baseName,
  reDirectionUrl,
  render,
}: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      {baseName && (
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link
                className="font-medium"
                to={reDirectionUrl ? reDirectionUrl : '/'}
              >
                {baseName && `${baseName} /`}
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      )}
      {render ? render() : <></>}
    </div>
  );
};

export default Breadcrumb;
