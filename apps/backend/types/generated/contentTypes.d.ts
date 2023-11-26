import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> & Attribute.Required & Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<'admin::transfer-token', 'oneToMany', 'admin::transfer-token-permission'>;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> & Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>;
    children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>;
    files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<'plugin::users-permissions.permission', 'manyToOne', 'plugin::users-permissions.role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.permission'>;
    users: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.user'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<'plugin::users-permissions.user', 'manyToOne', 'plugin::users-permissions.role'>;
    Returns: Attribute.Relation<'plugin::users-permissions.user', 'oneToMany', 'api::zwroty.zwroty'>;
    Orders: Attribute.Relation<'plugin::users-permissions.user', 'oneToMany', 'api::zamowienie.zamowienie'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiAdresAdres extends Schema.CollectionType {
  collectionName: 'adresses';
  info: {
    singularName: 'adres';
    pluralName: 'adresses';
    displayName: 'Adres';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    City: Attribute.String;
    Street: Attribute.String;
    Building_Number: Attribute.String;
    Premises_Number: Attribute.String;
    Zip_Code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::adres.adres', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::adres.adres', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiArtykulArtykul extends Schema.CollectionType {
  collectionName: 'artykuls';
  info: {
    singularName: 'artykul';
    pluralName: 'artykuls';
    displayName: 'Artyku\u0142';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    Image: Attribute.Media & Attribute.Required;
    Title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::artykul.artykul', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::artykul.artykul', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiDostepneRozmiaryDostepneRozmiary extends Schema.CollectionType {
  collectionName: 'dostepne_rozmiaries';
  info: {
    singularName: 'dostepne-rozmiary';
    pluralName: 'dostepne-rozmiaries';
    displayName: 'Dost\u0119pne Rozmiary';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Size: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::dostepne-rozmiary.dostepne-rozmiary', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::dostepne-rozmiary.dostepne-rozmiary', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiGaleriaGaleria extends Schema.SingleType {
  collectionName: 'galerias';
  info: {
    singularName: 'galeria';
    pluralName: 'galerias';
    displayName: 'Galeria';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Categories: Attribute.DynamicZone<['zdjecia.category']>;
    Preview: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::galeria.galeria', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::galeria.galeria', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiHistoriaHistoria extends Schema.SingleType {
  collectionName: 'historias';
  info: {
    singularName: 'historia';
    pluralName: 'historias';
    displayName: 'Historia';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::historia.historia', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::historia.historia', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiKategoriaProduktuKategoriaProduktu extends Schema.CollectionType {
  collectionName: 'kategoria_produktus';
  info: {
    singularName: 'kategoria-produktu';
    pluralName: 'kategoria-produktus';
    displayName: 'Kategoria Produktu';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::kategoria-produktu.kategoria-produktu', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::kategoria-produktu.kategoria-produktu', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiKontaktKontakt extends Schema.SingleType {
  collectionName: 'kontakts';
  info: {
    singularName: 'kontakt';
    pluralName: 'kontakts';
    displayName: 'Kontakt';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Phone_Number: Attribute.String;
    Address: Attribute.String;
    Opening_Hours: Attribute.String;
    KRS: Attribute.String;
    NIP: Attribute.String;
    REGON: Attribute.String;
    Bank_Account_Number: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::kontakt.kontakt', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::kontakt.kontakt', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPodatek15Podatek15 extends Schema.SingleType {
  collectionName: 'podatek_1_5s';
  info: {
    singularName: 'podatek-1-5';
    pluralName: 'podatek-1-5s';
    displayName: 'Podatek 1.5%';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String;
    Image: Attribute.Media;
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::podatek-1-5.podatek-1-5', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::podatek-1-5.podatek-1-5', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPolitykaCookiePolitykaCookie extends Schema.SingleType {
  collectionName: 'polityka_cookies';
  info: {
    singularName: 'polityka-cookie';
    pluralName: 'polityka-cookies';
    displayName: 'Polityka Cookie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::polityka-cookie.polityka-cookie', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::polityka-cookie.polityka-cookie', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPolitykaDostawPolitykaDostaw extends Schema.SingleType {
  collectionName: 'polityka_dostaws';
  info: {
    singularName: 'polityka-dostaw';
    pluralName: 'polityka-dostaws';
    displayName: 'Polityka Dostaw';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::polityka-dostaw.polityka-dostaw', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::polityka-dostaw.polityka-dostaw', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPolitykaPrywatnosciPolitykaPrywatnosci extends Schema.SingleType {
  collectionName: 'polityka_prywatnoscis';
  info: {
    singularName: 'polityka-prywatnosci';
    pluralName: 'polityka-prywatnoscis';
    displayName: 'Polityka Prywatnosci';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::polityka-prywatnosci.polityka-prywatnosci', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::polityka-prywatnosci.polityka-prywatnosci', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPolitykaReklamacjiPolitykaReklamacji extends Schema.SingleType {
  collectionName: 'polityka_reklamacjis';
  info: {
    singularName: 'polityka-reklamacji';
    pluralName: 'polityka-reklamacjis';
    displayName: 'Polityka Reklamacji';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::polityka-reklamacji.polityka-reklamacji', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::polityka-reklamacji.polityka-reklamacji', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPolitykaZwrotowPolitykaZwrotow extends Schema.SingleType {
  collectionName: 'polityka_zwrotows';
  info: {
    singularName: 'polityka-zwrotow';
    pluralName: 'polityka-zwrotows';
    displayName: 'Polityka Zwrotow';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::polityka-zwrotow.polityka-zwrotow', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::polityka-zwrotow.polityka-zwrotow', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiProduktProdukt extends Schema.CollectionType {
  collectionName: 'produkts';
  info: {
    singularName: 'produkt';
    pluralName: 'produkts';
    displayName: 'Produkt';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    Price: Attribute.Decimal;
    Image: Attribute.Media;
    Description: Attribute.Text;
    Category: Attribute.Relation<'api::produkt.produkt', 'oneToOne', 'api::kategoria-produktu.kategoria-produktu'>;
    Sizes: Attribute.Relation<'api::produkt.produkt', 'oneToMany', 'api::dostepne-rozmiary.dostepne-rozmiary'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::produkt.produkt', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::produkt.produkt', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiRegulaminSklepuRegulaminSklepu extends Schema.SingleType {
  collectionName: 'regulamin_sklepus';
  info: {
    singularName: 'regulamin-sklepu';
    pluralName: 'regulamin-sklepus';
    displayName: 'Regulamin Sklepu';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::regulamin-sklepu.regulamin-sklepu', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::regulamin-sklepu.regulamin-sklepu', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiReklamacjeReklamacje extends Schema.CollectionType {
  collectionName: 'reklamacjes';
  info: {
    singularName: 'reklamacje';
    pluralName: 'reklamacjes';
    displayName: 'Reklamacje';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Complaint_Date: Attribute.Date;
    Complaint_Realization_Date: Attribute.Date;
    Is_Realized: Attribute.Boolean;
    Additional_Info: Attribute.Text;
    Order: Attribute.Relation<'api::reklamacje.reklamacje', 'oneToOne', 'api::zamowienie.zamowienie'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::reklamacje.reklamacje', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::reklamacje.reklamacje', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiSponsorSponsor extends Schema.CollectionType {
  collectionName: 'sponsors';
  info: {
    singularName: 'sponsor';
    pluralName: 'sponsors';
    displayName: 'Sponsorzy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Description: Attribute.Text;
    Name: Attribute.String & Attribute.Required;
    Image: Attribute.Media & Attribute.Required;
    Order: Attribute.Integer & Attribute.Required;
    Url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::sponsor.sponsor', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::sponsor.sponsor', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiStronaStrona extends Schema.CollectionType {
  collectionName: 'stronas';
  info: {
    singularName: 'strona';
    pluralName: 'stronas';
    displayName: 'Strona';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 250;
      }>;
    Metadata: Attribute.Component<'strona.metadata'> & Attribute.Required;
    Page_Content: Attribute.DynamicZone<
      [
        'strona.header',
        'strona.location',
        'strona.promo-card',
        'zdjecia.category',
        'strona.contact-form',
        'strona.user-info-section',
        'strona.simple-content'
      ]
    >;
    Page_Url: Attribute.String & Attribute.Required & Attribute.Unique;
    Order: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::strona.strona', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::strona.strona', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiTabela3LmTabela3Lm extends Schema.CollectionType {
  collectionName: 'tabela_3_lms';
  info: {
    singularName: 'tabela-3-lm';
    pluralName: 'tabela-3-lms';
    displayName: 'Tabela 3LM';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Table: Attribute.DynamicZone<['rozgrywki.position']>;
    Stage_Name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tabela-3-lm.tabela-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::tabela-3-lm.tabela-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiTerminarz3LmTerminarz3Lm extends Schema.CollectionType {
  collectionName: 'terminarz_3_lms';
  info: {
    singularName: 'terminarz-3-lm';
    pluralName: 'terminarz-3-lms';
    displayName: 'Terminarz 3LM';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Stage_Name: Attribute.String & Attribute.Required;
    Schedule: Attribute.DynamicZone<['rozgrywki.game']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::terminarz-3-lm.terminarz-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::terminarz-3-lm.terminarz-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiTrenerzy2LmTrenerzy2Lm extends Schema.CollectionType {
  collectionName: 'trenerzy_2_lms';
  info: {
    singularName: 'trenerzy-2-lm';
    pluralName: 'trenerzy-2-lms';
    displayName: 'Trenerzy 2LM';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    First_Name: Attribute.String;
    Last_Name: Attribute.String;
    Position: Attribute.String;
    Photo: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::trenerzy-2-lm.trenerzy-2-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::trenerzy-2-lm.trenerzy-2-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiTrenerzy3LmTrenerzy3Lm extends Schema.CollectionType {
  collectionName: 'trenerzy_3_lms';
  info: {
    singularName: 'trenerzy-3-lm';
    pluralName: 'trenerzy-3-lms';
    displayName: 'Trenerzy 3LM';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    First_Name: Attribute.String;
    Last_Name: Attribute.String;
    Position: Attribute.String;
    Photo: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::trenerzy-3-lm.trenerzy-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::trenerzy-3-lm.trenerzy-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiUstawieniaOgolneUstawieniaOgolne extends Schema.SingleType {
  collectionName: 'ustawienia_ogolnes';
  info: {
    singularName: 'ustawienia-ogolne';
    pluralName: 'ustawienia-ogolnes';
    displayName: 'Ustawienia og\u00F3lne';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Youtube_Url: Attribute.String & Attribute.DefaultTo<'https://www.youtube.com/watch?v=9Mde8oWhGTI'>;
    Team_Banner: Attribute.Media & Attribute.Required;
    Shop_Intro: Attribute.Text & Attribute.Required;
    Youtube_Intro: Attribute.Text & Attribute.Required;
    Club_Intro: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::ustawienia-ogolne.ustawienia-ogolne', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::ustawienia-ogolne.ustawienia-ogolne', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiUstawieniaPzKoszUstawieniaPzKosz extends Schema.SingleType {
  collectionName: 'ustawienia_pz_koszs';
  info: {
    singularName: 'ustawienia-pz-kosz';
    pluralName: 'ustawienia-pz-koszs';
    displayName: 'Ustawienia PZKosz';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    settings: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::ustawienia-pz-kosz.ustawienia-pz-kosz', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::ustawienia-pz-kosz.ustawienia-pz-kosz', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiWiadomoscKontaktowaWiadomoscKontaktowa extends Schema.CollectionType {
  collectionName: 'wiadomosc_kontaktowas';
  info: {
    singularName: 'wiadomosc-kontaktowa';
    pluralName: 'wiadomosc-kontaktowas';
    displayName: 'Wiadomo\u015B\u0107 Kontaktowa';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    Message: Attribute.Text;
    Email: Attribute.Email;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::wiadomosc-kontaktowa.wiadomosc-kontaktowa', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::wiadomosc-kontaktowa.wiadomosc-kontaktowa', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiZamowienieZamowienie extends Schema.CollectionType {
  collectionName: 'zamowienies';
  info: {
    singularName: 'zamowienie';
    pluralName: 'zamowienies';
    displayName: 'Zamowienie';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Order_Date: Attribute.Date;
    Order_Sent_Date: Attribute.Date;
    Is_Sent: Attribute.Boolean;
    Is_Realized: Attribute.Boolean;
    Note: Attribute.Text;
    City: Attribute.String;
    Building_Number: Attribute.String;
    Apartment_Number: Attribute.String;
    Zip_Code: Attribute.String;
    Details: Attribute.DynamicZone<['zamowienie.products']>;
    Order_Number: Attribute.String;
    Is_Returned: Attribute.Boolean;
    Last_Name: Attribute.String;
    First_Name: Attribute.String;
    Phone_Number: Attribute.String;
    Street: Attribute.String;
    User: Attribute.Relation<'api::zamowienie.zamowienie', 'manyToOne', 'plugin::users-permissions.user'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::zamowienie.zamowienie', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::zamowienie.zamowienie', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiZarzadZarzad extends Schema.CollectionType {
  collectionName: 'zarzads';
  info: {
    singularName: 'zarzad';
    pluralName: 'zarzads';
    displayName: 'Zarzad';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    First_Name: Attribute.String;
    Last_Name: Attribute.String;
    Position: Attribute.String;
    Image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::zarzad.zarzad', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::zarzad.zarzad', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiZawodnicy2LmZawodnicy2Lm extends Schema.CollectionType {
  collectionName: 'zawodnicy_2_lms';
  info: {
    singularName: 'zawodnicy-2-lm';
    pluralName: 'zawodnicy-2-lms';
    displayName: 'Zawodnicy 2LM';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Number: Attribute.Integer;
    First_Name: Attribute.String;
    Last_Name: Attribute.String;
    Birthday: Attribute.Date;
    Position: Attribute.String;
    Photo: Attribute.Media;
    Images: Attribute.Media;
    Info: Attribute.RichText;
    Height: Attribute.Integer;
    Average_Points: Attribute.Decimal;
    Average_Rebounds: Attribute.Decimal;
    Average_Asists: Attribute.Decimal;
    Average_Minutes: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::zawodnicy-2-lm.zawodnicy-2-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::zawodnicy-2-lm.zawodnicy-2-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiZawodnicy3LmZawodnicy3Lm extends Schema.CollectionType {
  collectionName: 'zawodnicy_3_lms';
  info: {
    singularName: 'zawodnicy-3-lm';
    pluralName: 'zawodnicy-3-lms';
    displayName: 'Zawodnicy 3LM';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Number: Attribute.Integer;
    First_Name: Attribute.String;
    Last_Name: Attribute.String;
    Birthday: Attribute.Date;
    Position: Attribute.String;
    Photo: Attribute.Media;
    Images: Attribute.Media;
    Info: Attribute.RichText;
    Height: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::zawodnicy-3-lm.zawodnicy-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::zawodnicy-3-lm.zawodnicy-3-lm', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiZwrotyZwroty extends Schema.CollectionType {
  collectionName: 'zwroties';
  info: {
    singularName: 'zwroty';
    pluralName: 'zwroties';
    displayName: 'Zwroty';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Return_Date: Attribute.Date;
    Return_Realization_Date: Attribute.Date;
    Is_Realized: Attribute.Boolean;
    Note: Attribute.Text;
    Order: Attribute.Relation<'api::zwroty.zwroty', 'oneToOne', 'api::zamowienie.zamowienie'>;
    User: Attribute.Relation<'api::zwroty.zwroty', 'manyToOne', 'plugin::users-permissions.user'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::zwroty.zwroty', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::zwroty.zwroty', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::adres.adres': ApiAdresAdres;
      'api::artykul.artykul': ApiArtykulArtykul;
      'api::dostepne-rozmiary.dostepne-rozmiary': ApiDostepneRozmiaryDostepneRozmiary;
      'api::galeria.galeria': ApiGaleriaGaleria;
      'api::historia.historia': ApiHistoriaHistoria;
      'api::kategoria-produktu.kategoria-produktu': ApiKategoriaProduktuKategoriaProduktu;
      'api::kontakt.kontakt': ApiKontaktKontakt;
      'api::podatek-1-5.podatek-1-5': ApiPodatek15Podatek15;
      'api::polityka-cookie.polityka-cookie': ApiPolitykaCookiePolitykaCookie;
      'api::polityka-dostaw.polityka-dostaw': ApiPolitykaDostawPolitykaDostaw;
      'api::polityka-prywatnosci.polityka-prywatnosci': ApiPolitykaPrywatnosciPolitykaPrywatnosci;
      'api::polityka-reklamacji.polityka-reklamacji': ApiPolitykaReklamacjiPolitykaReklamacji;
      'api::polityka-zwrotow.polityka-zwrotow': ApiPolitykaZwrotowPolitykaZwrotow;
      'api::produkt.produkt': ApiProduktProdukt;
      'api::regulamin-sklepu.regulamin-sklepu': ApiRegulaminSklepuRegulaminSklepu;
      'api::reklamacje.reklamacje': ApiReklamacjeReklamacje;
      'api::sponsor.sponsor': ApiSponsorSponsor;
      'api::strona.strona': ApiStronaStrona;
      'api::tabela-3-lm.tabela-3-lm': ApiTabela3LmTabela3Lm;
      'api::terminarz-3-lm.terminarz-3-lm': ApiTerminarz3LmTerminarz3Lm;
      'api::trenerzy-2-lm.trenerzy-2-lm': ApiTrenerzy2LmTrenerzy2Lm;
      'api::trenerzy-3-lm.trenerzy-3-lm': ApiTrenerzy3LmTrenerzy3Lm;
      'api::ustawienia-ogolne.ustawienia-ogolne': ApiUstawieniaOgolneUstawieniaOgolne;
      'api::ustawienia-pz-kosz.ustawienia-pz-kosz': ApiUstawieniaPzKoszUstawieniaPzKosz;
      'api::wiadomosc-kontaktowa.wiadomosc-kontaktowa': ApiWiadomoscKontaktowaWiadomoscKontaktowa;
      'api::zamowienie.zamowienie': ApiZamowienieZamowienie;
      'api::zarzad.zarzad': ApiZarzadZarzad;
      'api::zawodnicy-2-lm.zawodnicy-2-lm': ApiZawodnicy2LmZawodnicy2Lm;
      'api::zawodnicy-3-lm.zawodnicy-3-lm': ApiZawodnicy3LmZawodnicy3Lm;
      'api::zwroty.zwroty': ApiZwrotyZwroty;
    }
  }
}
