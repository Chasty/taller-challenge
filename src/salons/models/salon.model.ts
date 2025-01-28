import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Salon {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
