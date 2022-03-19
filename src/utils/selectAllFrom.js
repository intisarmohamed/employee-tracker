const selectFromDepartment = async (db) => {
  return db.query("SELECT * FROM department");
};

const selectFromRole = async (db) => {
  return db.query("SELECT * FROM role");
};

const selectFromEmployee = async (db) => {
  return db.query("SELECT * FROM employee");
};

module.exports = {
  selectFromDepartment,
  selectFromRole,
  selectFromEmployee,
};
