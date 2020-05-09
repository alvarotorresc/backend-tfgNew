export type ResearcherTokenPayload = {
  type: 'researcher';
  researcherId: string;
};

export type AdminTokenPayload = {
  type: 'admin';
  researcherId: string;
};

export type TokenPayload = ResearcherTokenPayload | AdminTokenPayload;

export type AuthTokenPayload = ResearcherTokenPayload | AdminTokenPayload;
