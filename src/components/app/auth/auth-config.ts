interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '5a4a6a15c5b9b33d10a53269',
  CLIENT_DOMAIN: 'findo.auth0.com', 
  AUDIENCE: 'http://localhost:9000',
  REDIRECT: 'http://localhost:8080/callback',
  SCOPE: 'openid profile email'
};