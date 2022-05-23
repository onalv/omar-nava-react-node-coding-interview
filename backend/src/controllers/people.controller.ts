import {
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  QueryParam,
  QueryParams,
} from 'routing-controllers';
import { PeopleProcessing } from '../services/people_processing.service';

const peopleProcessing = new PeopleProcessing();

class GetUsersQuery {
  gender: string;
  company: string;
  title: string;
}

@JsonController('/people', { transformResponse: false })
export default class PeopleController {
  @HttpCode(200)
  @Get('/all')
  getAllPeople(@QueryParams() query: GetUsersQuery) {
    let people;
    if (query.gender) {
      people = peopleProcessing.getByGender(query.gender);
    } else if (query.company) {
      people = peopleProcessing.getByCompany(query.company);
    } else if (query.title) {
      people = peopleProcessing.getByTitle(query.title);
    } else {
      people = peopleProcessing.getAll();
    }

    if (!people) {
      throw new NotFoundError('No people found');
    }

    return {
      data: people,
    };
  }

  @HttpCode(200)
  @Get('/:id')
  getPerson(@Param('id') id: number) {
    const person = peopleProcessing.getById(id);

    if (!person) {
      throw new NotFoundError('No person found');
    }

    return {
      data: person,
    };
  }
}

// people/all
// people/all?gender=Male?company=Zoomzone
// people/:id
