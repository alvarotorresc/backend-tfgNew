export type ResearcherTokenPayload = {
  type: 'researcher' | 'admin';
  researcherId: string;
};

export type TokenPayload = ResearcherTokenPayload;

export type AuthTokenPayload = ResearcherTokenPayload;
