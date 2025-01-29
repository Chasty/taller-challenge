import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Salon {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  location: string;
}
