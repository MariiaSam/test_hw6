
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from 'store/Filter/filterSlice';
import { selectFilter } from 'store/Filter/filterSelector';

import { Label, Input } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)

  const onChange = e => {
    dispatch(setFilter(e.currentTarget.value));
}

  return (
    <Label>
      <Input
        type="text"
        placeholder="Search..."
        // name="filter"
        value={filter}
        onChange={onChange}
      />
    </Label>
  );
}

