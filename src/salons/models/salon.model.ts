import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Salon {
  @Field(() => Number)
  id: number;

  @Field()
  name: string;

  @Field()
  location: string;
}
