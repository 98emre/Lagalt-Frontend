import Keycloak, {
    KeycloakError,
    KeycloakInitOptions,
    KeycloakPromise,
    KeycloakTokenParsed,
  } from 'keycloak-js';
  
  /**
   * An instance of keycloak using extended interface with config from the keycloak.json file.
   * @type { KeycloakInstance } keycloak
   */
  const keycloak: KeycloakInstance = new Keycloak('./assets/keycloak.json') as KeycloakInstance;
  
  /**
   * Initialize Keycloak and silently checking for an existing login.
   * @description Should be called before render() of app.
   * @returns { Promise<boolean, KeycloakError> } Promise
   */
  export const initialize = (): KeycloakPromise<boolean, KeycloakError> => {
    const config: KeycloakInitOptions = {
      checkLoginIframe: false,
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
    };
    return keycloak.init(config);
  };
  
  export default keycloak as KeycloakInstance;
  
  /**---------------------------------------------------------------------------
   * Extended Interfaces to improve the intelli-sense for TypeScript.
   ---------------------------------------------------------------------------*/
  
  interface KeycloakInstance extends Keycloak {
    tokenParsed?: KeycloakTokenParsedExtended;
  }
  
  interface KeycloakTokenParsedExtended extends KeycloakTokenParsed {
    // Extend with Additional Properties
    'allowed-origins': string[];
    email?: string;
    email_verified?: boolean;
    family_name?: string;
    given_name?: string;
    jti?: string;
    name?: string;
    preferred_username?: string;
    roles?: string[];
    scope?: string;
    sid?: string;
    typ?: string;
  }
  