import React from 'react';
import deleteIcon from '../resources/images/delete.svg';

function RecentSearch({ search }) {
  return (
    <div className="w-[100%] py-[9px] flex flex-row justify-between items-center">
      <p className="text-sm text-[#131518]">스킨/토너</p>
      <div>
        <img src={deleteIcon} alt="delete" />
      </div>
    </div>
  );
}
export default RecentSearch;
