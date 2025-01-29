import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => Number)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
