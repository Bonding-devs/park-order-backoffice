import { LocationModel } from '../../models/location-model';
import { CiLocationOn } from 'react-icons/ci';
import userEmpty from '../../images/user/user-empty.jpg';
interface LocationItemParams {
  location: LocationModel;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
}

export const LocationItem: React.FC<LocationItemParams> = (props) => {
  return (
    <div
      className="relative mt-3 flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark"
      onClick={props.handleClick}
    >
      {props.isSelected ? (
        <div className="absolute left-0 right-0 top-0 h-full w-1 bg-strokedark"></div>
      ) : null}
      <div className="relative mr-3.5 h-14 w-full max-w-14 rounded-full">
        <img
          src={
            props.location.photo?.path || userEmpty
          }
          alt="profile"
          className="h-full w-full rounded-full object-cover object-center"
        />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
      </div>

      <div className="flex-grid flex  w-full">
        <div className="flex-auto ">
          <h5 className="text-sm font-medium text-black dark:text-white">
            {props.location.name}
          </h5>
          <div className="flex items-center ">

            <p className="text-sm">{props.location.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
