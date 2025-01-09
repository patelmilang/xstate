const Dropdown = ({ id, items, isdisabled }) => {
  return (
    <div>
      <select id="ddlid" disabled={isdisabled}>
        <option value="">Select {id}</option>
        <option value="1">1</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};

export default Dropdown;
