/* eslint-disable */
/* tslint:disable */

export interface GqlAuthOutput { id: string; email: string; lastName: string; firstName: string; joinDate: Date; role: string; token: string; }
export interface GqlLoggedUser { id: string; email: string; lastName: string; firstName: string; joinDate: Date; role: string; token: string; }
export interface Query { me: GqlLoggedUser; }
export interface Mutation { signup: (email: string, lastName: string, firstName: string, password: string) => GqlAuthOutput; login: (username: string, password: string) => GqlAuthOutput; }

export type SignupMutationArgs = { email: string, lastName: string, firstName: string, password: string };
export type LoginMutationArgs = { username: string, password: string };
