import Employee from "./Employee";

class Accountant extends Employee {

  constructor({id, name, ratePerHour, registration }) {
    super({id, name, ratePerHour });
    this.registrationNumber = String(registration) ?? null;
  }
}

export default Accountant;