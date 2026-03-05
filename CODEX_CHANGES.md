## Codex Changes

Ce fichier liste les modifications appliquees directement par Codex dans ce projet.
Il n'inclut pas les changements faits manuellement par l'utilisateur dans l'IDE, SQL*Plus, SQL Developer ou Visual Studio, sauf quand ils sont mentionnes dans la section "Hors code".

### Backend API

- `SA.CheckTrackingPlatform.Services.LateralService/Controllers/CheckesController.cs`
  - evite le crash si le claim Keycloak `InternalUserElectronicAddress` est absent
  - conserve la valeur deja fournie par la requete si elle existe

- `SA.CheckTrackingPlatform.Services.LateralService/Controllers/InternalUserInternalRolesController.cs`
  - meme correction de fallback sur `InternalUserElectronicAddress`

- `SA.CheckTrackingPlatform.Services.LateralService/Controllers/TimelinesController.cs`
  - meme correction de fallback sur `InternalUserElectronicAddress`

- `SA.CheckTrackingPlatform.Services.LateralService/appsettings.Development.json`
  - desactivation de Keycloak en dev avec `KeycloakAuthentication.IsEnabled = false`

### Frontend Auth et appels API

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/Checks/ChecksSaga.ts`
  - envoie maintenant `InternalUserElectronicAddress`
  - envoie `PageIndex`
  - recupere l'utilisateur courant via `UserService.getCurrentInternalUser()`

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/InternalRoles/internalRolesSaga.ts`
  - envoie `InternalUserElectronicAddress` a l'endpoint des roles internes

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/timeline/createTimelineSaga.ts`
  - ajoute `InternalUserElectronicAddress` dans le `FormData`
  - corrige l'erreur TypeScript du generator en ajoutant `: any`

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-helpers/src/services/authentication/UserService.ts`
  - fallback sur `email`, `preferred_username` ou `upn` pour l'adresse interne
  - en dev, l'utilisateur local factice n'est utilise que si `REACT_APP_USE_DEV_MOCKS=true`
  - sinon le helper appelle le backend reel

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/.env.dev`
  - ajout de `REACT_APP_USE_DEV_MOCKS=false`

### Mode mock / offline dev

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/devMocks.ts`
  - creation d'un fichier de donnees mock
  - le mode mock est maintenant active uniquement si `REACT_APP_USE_DEV_MOCKS=true`

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/Status/StatusSaga.ts`
  - support des statuts mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/ReasonMove/ReasonMoveSaga.ts`
  - support des motifs mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/KPIs/CheckTrackingKPIsSaga.ts`
  - support des KPIs mock
  - support du fichier Excel mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/DetailsCh/DetailsChSaga.ts`
  - support du detail chèque mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/DetailsCheck/DetailsCheckSaga.ts`
  - support du detail chèque mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/Checks/ChecksSaga.ts`
  - support de la liste de chèques mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/InternalRoles/internalRolesSaga.ts`
  - support des roles mock

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/store/timeline/createTimelineSaga.ts`
  - support de creation de timeline mock

### UI et runtime

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/App.tsx`
  - ajout des flags `future` de React Router pour supprimer les warnings v7

- `SA.CheckTrackingPlatform.Websites/packages/ui-kit/src/components/atoms/Backdrop/index.tsx`
  - le composant accepte `open` ou `loading`
  - evite `Modal open is undefined`

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/containers/Checks/Checks.tsx`
  - le backdrop suit `isLoadingChecksData`
  - suppression d'un `console.log` de debug

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/containers/NavigationBar/NavigationBar.tsx`
  - la valeur des tabs est derivee de la route
  - evite l'erreur MUI sur `/detailscheck`

- `SA.CheckTrackingPlatform.Websites/apps/checkTracking-platform-websites-backoffice/src/pages/RoleProvider/index.tsx`
  - correction d'une boucle de rendu
  - garde anti-redispatch avec `useRef`
  - bypass dev pour ne pas bloquer l'ecran si les roles echouent

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/Roles/permissions_gate.tsx`
  - bypass dev pour laisser passer l'affichage

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/containers/RenderByRoles/RenderByRoles.tsx`
  - bypass dev
  - typage de retour explicite

### Corrections TypeScript

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/containers/CheckDetails/OutlinedTimeline.tsx`
  - correction du rendu `framer-motion` / MUI

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/containers/Checks/FormSearch/formInterfaces.tsx`
  - suppression d'un mauvais import
  - correction du type `resetedValues`

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/containers/Treatment/FormSearch/FormSearch.tsx`
  - correction d'un acces nullable sur `inputRefs`

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/Roles/useRole.ts`
  - retour type `string[]`

- `SA.CheckTrackingPlatform.Websites/packages/checkTracking-platform-websites-shared/src/Roles/role-permission-maps.ts`
  - remplacement du `enum ROLE` vide par `type ROLE = string`

- `SA.CheckTrackingPlatform.Websites/packages/ui-kit/src/components/atoms/PhoneNumber/InputComponent.tsx`
  - typage `forwardRef`
  - `name` et `value` rendus optionnels

### Dependances

- `SA.CheckTrackingPlatform.Websites/package.json`
  - ajout de:
    - `ajv`
    - `ajv-keywords`
  - utilise pour stabiliser la toolchain front

### Hors code

- schema Oracle local cree via:
  - `dotnet ef database update`

- donnees Oracle locales inserees manuellement pendant le debug:
  - `Statuses`
  - `Services`
  - `Banks`
  - `Branchs`
  - `InternalUsers`
  - `InternalRoles`
  - `InternalUserInternalRoles`
  - `Checks`
  - `Timelines`

### Notes

- Certains fichiers modifies dans `git status` peuvent avoir ete changes manuellement par l'utilisateur ou par des outils externes; ils ne sont pas revendiques ici comme des changements Codex si je ne les ai pas edites directement.
- Si tu veux un fichier avec le diff brut Git complet, je peux aussi te generer un second fichier de type patch.
