import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
