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

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
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
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<'plugin::content-releases.release', 'oneToMany', 'plugin::content-releases.release-action'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
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
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<'plugin::content-releases.release-action', 'manyToOne', 'plugin::content-releases.release'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private;
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

export interface ApiGaleriaGaleria extends Schema.CollectionType {
  collectionName: 'galerias';
  info: {
    singularName: 'galeria';
    pluralName: 'galerias';
    displayName: 'Galeria';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Preview: Attribute.Media & Attribute.Required;
    Images: Attribute.Media & Attribute.Required;
    Event_Date: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::galeria.galeria', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::galeria.galeria', 'oneToOne', 'admin::user'> & Attribute.Private;
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
    Display_Menu: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::strona.strona', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'api::strona.strona', 'oneToOne', 'admin::user'> & Attribute.Private;
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

export interface ApiUstawieniaOgolneUstawieniaOgolne extends Schema.SingleType {
  collectionName: 'ustawienia_ogolnes';
  info: {
    singularName: 'ustawienia-ogolne';
    pluralName: 'ustawienia-ogolnes';
    displayName: 'Ustawienia og\u00F3lne';
    description: '';
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
    Gallery_Preview: Attribute.Media & Attribute.Required;
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
    Number: Attribute.Integer & Attribute.Required;
    First_Name: Attribute.String;
    Last_Name: Attribute.String;
    Birthday: Attribute.Date & Attribute.Required;
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
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::adres.adres': ApiAdresAdres;
      'api::artykul.artykul': ApiArtykulArtykul;
      'api::dostepne-rozmiary.dostepne-rozmiary': ApiDostepneRozmiaryDostepneRozmiary;
      'api::galeria.galeria': ApiGaleriaGaleria;
      'api::kategoria-produktu.kategoria-produktu': ApiKategoriaProduktuKategoriaProduktu;
      'api::produkt.produkt': ApiProduktProdukt;
      'api::reklamacje.reklamacje': ApiReklamacjeReklamacje;
      'api::sponsor.sponsor': ApiSponsorSponsor;
      'api::strona.strona': ApiStronaStrona;
      'api::trenerzy-2-lm.trenerzy-2-lm': ApiTrenerzy2LmTrenerzy2Lm;
      'api::ustawienia-ogolne.ustawienia-ogolne': ApiUstawieniaOgolneUstawieniaOgolne;
      'api::ustawienia-pz-kosz.ustawienia-pz-kosz': ApiUstawieniaPzKoszUstawieniaPzKosz;
      'api::wiadomosc-kontaktowa.wiadomosc-kontaktowa': ApiWiadomoscKontaktowaWiadomoscKontaktowa;
      'api::zamowienie.zamowienie': ApiZamowienieZamowienie;
      'api::zarzad.zarzad': ApiZarzadZarzad;
      'api::zawodnicy-2-lm.zawodnicy-2-lm': ApiZawodnicy2LmZawodnicy2Lm;
      'api::zwroty.zwroty': ApiZwrotyZwroty;
    }
  }
}
