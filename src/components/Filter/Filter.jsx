import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';

import { setFilter } from 'store/Filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'store/Filter/filterSelector';

export const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)

  const onChange = e => {
    dispatch(setFilter(e.target.value.toLowerCase().trim()))
}

  return (
    <Label>
      <Input
        type="text"
        placeholder="Search..."
        name="filter"
        value={filter}
        onChange={onChange}
      />
    </Label>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
