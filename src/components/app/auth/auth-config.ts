import { SERVER_URI, URI } from '../../../config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'FkcsFLCal4iwRdteOG4XUAlKOxXl0ojd',
  CLIENT_DOMAIN: 'findo.auth0.com', 
  AUDIENCE: SERVER_URI,
  REDIRECT: `${URI}/callback`,
  SCOPE: 'openid profile email'
};