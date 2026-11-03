---
date_created: 2026-08-21
date_modified: 2026-10-18
aliases:
  - OIDC
tags:
  - Web-Security
  - Security-First
  - Authorization
  - Developer-Tools
  - State-Of-The-Art-Practices
  - Engineering-Management
for_clients:
  - Laerdal
  - Param
  - Parslee
  - Lossless
  - FullStackVC
  - LFG
---
OpenID Connect (OIDC) is an identity authentication protocol built on top of the OAuth 2.0 framework that lets applications verify a user's identity and perform [[Vocabulary/Single Sign-On|Single Sign-On]] (SSO). [^j3b5fq] [^6sz9qt]

How OIDC Differs from OAuth 2.0

- OAuth 2.0 (Authorization): Answers “What is this application allowed to access?” and issues access tokens. [^ry6chi] [^j3b5fq]
- OIDC (Authentication): Answers “Who is this user?” and adds a standardized ID Token (a signed JSON Web Token or JWT) to prove the user has logged in. [^w4ex5e] [^j3b5fq]

Core Components

- End-User (Resource Owner): The person trying to sign in to an application. [^w4ex5e]
- Relying Party (RP / Client): The application or website requesting the user's authentication. [^ry6chi]
- OpenID Provider (OP / [[Vocabulary/Identity Provider]]): The trusted service (such as Google, Microsoft Entra ID, or [[Tooling/Enterprise Jobs-to-be-Done/Okta|Okta]]) that authenticates the user and issues ID tokens. [^ry6chi]
- UserInfo Endpoint: An optional API provided by the OP that returns additional profile claims if presented with a valid access token. [^j3b5fq]

Standard Authentication Flow (Authorization Code Flow with PKCE)

1. Authentication Request: The user clicks "Sign in" (e.g., Continue with Google). The Relying Party redirects the user to the OpenID Provider with scope=openid and a generated nonce.
2. [[Vocabulary/User Authentication|User Authentication]]: The provider verifies the user via password, multi-factor authentication (MFA), or biometrics.
3. Authorization Response: The provider redirects the user back to the app with a temporary authorization code.
4. Token Exchange: The app exchanges the authorization code server-to-server for an ID Token, an Access Token, and an optional Refresh Token.
5. Token Validation: The app cryptographically validates the ID token's signature (using the provider's public keys via JWKS), expiration time, audience, issuer, and nonce. [^j3b5fq]

Security Best Practices

- Enforce [[projects/Emergent-Innovation/Standards/HTTPS|HTTPS]]: Never send tokens or credentials over unencrypted HTTP in production. [^j3b5fq]
- Validate ID Tokens Locally: Always verify the signature, issuer (iss), audience (aud), and expiration (exp) on the client/server side. [^j3b5fq] [^w4ex5e]
- Use [[Vocabulary/Proof Key for Code Exchange|PKCE]]: Implement [[Vocabulary/Proof Key for Code Exchange|Proof Key for Code Exchange]], especially for public or mobile/[[Tooling/Software Development/Programming Languages/JavaScript|JavaScript]] clients. [^6sz9qt] [^j3b5fq]
- Avoid the Implicit Flow: The older implicit flow is discouraged in modern OIDC implementations in favor of the Authorization Code Flow with PKCE. [^6sz9qt]


[^j3b5fq]: [https://auth0.com/intro-to-iam/what-is-openid-connect-oidc](https://auth0.com/intro-to-iam/what-is-openid-connect-oidc)
[^6sz9qt]: [https://medium.com/@dmosyan/openid-connect-oidc-explained-b7a368c90168](https://medium.com/@dmosyan/openid-connect-oidc-explained-b7a368c90168)
[^ry6chi]: [https://duo.com/learn/what-is-oidc](https://duo.com/learn/what-is-oidc)
[^w4ex5e]: [https://www.fortinet.com/resources/cyberglossary/oidc](https://www.fortinet.com/resources/cyberglossary/oidc)


