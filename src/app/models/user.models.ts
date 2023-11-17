// /src/app/models/user.model.ts

export class User {
    username: string;
    name: string;
    lastName: string;
    rut: string;
    email: string;
    career: string;
    region: string;
    commune: string;
    address: string;
    password: string;
  
    constructor(
      username: string,
      name: string,
      lastName: string,
      rut: string,
      email: string,
      career: string,
      region: string,
      commune: string,
      address: string,
      password: string
    ) {
      this.username = username;
      this.name = name;
      this.lastName = lastName;
      this.rut = rut;
      this.email = email;
      this.career = career;
      this.region = region;
      this.commune = commune;
      this.address = address;
      this.password = password;
    }
  }
  