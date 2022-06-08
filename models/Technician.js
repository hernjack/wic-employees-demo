import Employee from "./Employee";

class Technician extends Employee {

  constructor({id, name, ratePerHour, registration, expireDate }) {
    super({id, name, ratePerHour });
    this.registrationNumber = String(registration) ?? null;
    this.expireDate = new Date(expireDate) ?? null;
  }
}

export default Technician;