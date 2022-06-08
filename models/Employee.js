const TAX_RATE_PERCENTAGE = 19.20;

class Employee {

  constructor({id, name, ratePerHour }) {
    this.employeeId = Number(id) ?? null;
    this.employeeName = String(name) ?? null;
    this.ratePerHour = Number(ratePerHour) ?? null;
  }

  getInfo() {
    return JSON.parse(JSON.stringify(this));
  }

  calculateWage(hourWage) {
    return this.ratePerHour * hourWage;
  }

  static calculateTax(wagePerWeek) {
    return wagePerWeek * (TAX_RATE_PERCENTAGE / 100);
  }
};

export default Employee;