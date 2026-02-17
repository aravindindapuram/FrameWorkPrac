import { faker } from "@faker-js/faker";

export class RandomDataUtil {

    static getFirstName() {
        return faker.person.firstName();
    }

    static getLstName() {
        return faker.person.lastName();
    }

    static getFullName() {
        return faker.person.fullName();
    }

    static getPhoneNumber() {
        return faker.phone.number();
    }

    static getEmail() {
        return faker.internet.email();
    }

    static getPassword() {
        return faker.internet.password({
            length: 10,
            memorable: false,   // ensures random characters
            pattern: /[A-Za-z0-9!@#$%^&*]/  // alphanumeric + special
        });
    }

    static getRandomNumbers() {
        return faker.string.numeric(10);
    }

}