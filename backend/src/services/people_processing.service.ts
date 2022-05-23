import people_data from '../data/people_data.json';

export class PeopleProcessing {
  getById(id: number) {
    return people_data.find((p) => p.id === id);
  }

  getByTitle(title: string) {
    return people_data.filter((p) => p.title === title);
  }

  getByCompany(company: string) {
    return people_data.filter((p) => p.company === company);
  }

  getByGender(gender: string) {
    return people_data.filter((p) => p.gender === gender);
  }

  getAll() {
    return people_data;
  }
}
