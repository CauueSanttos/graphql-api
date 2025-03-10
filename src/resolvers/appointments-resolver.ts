import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { CreateAppointmentInput } from '../dtos/inputs/create-appointment-input';
import { Appointment } from '../dtos/models/appointment-model';
import { Customer } from '../dtos/models/customer-model';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  @Query(() => [Appointment])
  appointments() {
    return [
      {
        startsAt: new Date(),
        endsAt: new Date(),
      },
    ];
  }

  @Mutation(() => Appointment)
  createAppointment(@Arg('data') data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };

    return appointment;
  }

  @FieldResolver(() => Customer)
  customer(@Root() appointment: Appointment) {
    console.log(appointment);

    return {
      name: 'John Doe',
    };
  }
}
