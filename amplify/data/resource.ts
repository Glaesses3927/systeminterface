import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  ComponentVote: a
    .model({
      componentId: a.id().required(),
      nice: a.integer().default(0),
      bad: a.integer().default(0),
    })
    .identifier(["componentId"])
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});
