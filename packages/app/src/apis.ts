import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
} from '@backstage/core-plugin-api';
import {
  graphQlBrowseApiRef,
  GraphQLEndpoints,
} from '@backstage/plugin-graphiql';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  createApiFactory({
    api: graphQlBrowseApiRef,
    deps: { },
    factory: () =>
      GraphQLEndpoints.from([
        // use the create function to connect an unauthenticated GraphQL API
        GraphQLEndpoints.create({
          id: 'petstore',
          title: 'PetStore',
          url: 'http://localhost:4000/'
        })
      ])
  }),
  ScmAuth.createDefaultApiFactory(),
];
