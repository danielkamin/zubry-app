import type { Schema, Attribute } from '@strapi/strapi';

export interface RozgrywkiGame extends Schema.Component {
  collectionName: 'components_rozgrywki_games';
  info: {
    displayName: 'Game';
    icon: 'basketball-ball';
    description: '';
  };
  attributes: {
    Host_Team: Attribute.String & Attribute.Required;
    Host_Points: Attribute.Integer;
    Away_Team: Attribute.String & Attribute.Required;
    Away_Points: Attribute.Integer;
    Game_Date: Attribute.DateTime & Attribute.Required;
    Game_Stage_Number: Attribute.Integer & Attribute.Required;
  };
}

export interface RozgrywkiPosition extends Schema.Component {
  collectionName: 'components_rozgrywki_positions';
  info: {
    displayName: 'Position';
    icon: 'th-list';
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Rank: Attribute.Integer & Attribute.Required;
    Games: Attribute.Integer & Attribute.Required;
    Wins: Attribute.Integer & Attribute.Required;
    Losses: Attribute.Integer & Attribute.Required;
    Points: Attribute.Integer & Attribute.Required;
  };
}

export interface StronaContactForm extends Schema.Component {
  collectionName: 'components_strona_contact_forms';
  info: {
    displayName: 'Contact form';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
  };
}

export interface StronaHeader extends Schema.Component {
  collectionName: 'components_strona_headers';
  info: {
    displayName: 'Image with description';
    description: '';
  };
  attributes: {
    Description: Attribute.Text & Attribute.Required;
    Picture: Attribute.Media & Attribute.Required;
    Is_Banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    Redirect_Url: Attribute.String;
  };
}

export interface StronaImageSlider extends Schema.Component {
  collectionName: 'components_strona_image_sliders';
  info: {
    displayName: 'Image slider';
    description: '';
  };
  attributes: {
    Preview: Attribute.Media & Attribute.Required;
  };
}

export interface StronaLocation extends Schema.Component {
  collectionName: 'components_strona_locations';
  info: {
    displayName: 'Location';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Iframe_Src: Attribute.Text;
  };
}

export interface StronaMetadata extends Schema.Component {
  collectionName: 'components_strona_metadata';
  info: {
    displayName: 'Metadata';
  };
  attributes: {
    Meta_Title: Attribute.String & Attribute.Required;
    Meta_Description: Attribute.Text;
  };
}

export interface StronaPromoCard extends Schema.Component {
  collectionName: 'components_strona_promo_cards';
  info: {
    displayName: 'Promo card';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Description: Attribute.Text;
    Picture: Attribute.Media;
    Redirect_Url: Attribute.String;
    Video_Url: Attribute.String;
  };
}

export interface StronaSimpleContent extends Schema.Component {
  collectionName: 'components_strona_simple_contents';
  info: {
    displayName: 'Simple content';
  };
  attributes: {
    Content: Attribute.RichText & Attribute.Required;
  };
}

export interface StronaUserCard extends Schema.Component {
  collectionName: 'components_strona_user_cards';
  info: {
    displayName: 'User card';
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Description: Attribute.String;
    Picture: Attribute.Media;
  };
}

export interface StronaUserInfoSection extends Schema.Component {
  collectionName: 'components_strona_user_info_sections';
  info: {
    displayName: 'User info section';
  };
  attributes: {
    User_Card: Attribute.Component<'strona.user-card', true>;
  };
}

export interface ZamowienieProducts extends Schema.Component {
  collectionName: 'components_zamowienie_products';
  info: {
    displayName: 'Products';
    icon: 'cart-arrow-down';
  };
  attributes: {
    Product: Attribute.Relation<'zamowienie.products', 'oneToOne', 'api::produkt.produkt'>;
    Size: Attribute.Relation<'zamowienie.products', 'oneToOne', 'api::dostepne-rozmiary.dostepne-rozmiary'>;
    Count: Attribute.Integer;
  };
}

export interface ZdjeciaCategory extends Schema.Component {
  collectionName: 'components_zdjecia_categories';
  info: {
    displayName: 'Category';
    icon: 'images';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Images: Attribute.Media;
    Thumbnail: Attribute.Media & Attribute.Required;
  };
}

export interface ZdjeciaImageWithTags extends Schema.Component {
  collectionName: 'components_zdjecia_image_with_tags';
  info: {
    displayName: 'Image with tags';
  };
  attributes: {
    Image: Attribute.Media & Attribute.Required;
    Tags: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'rozgrywki.game': RozgrywkiGame;
      'rozgrywki.position': RozgrywkiPosition;
      'strona.contact-form': StronaContactForm;
      'strona.header': StronaHeader;
      'strona.image-slider': StronaImageSlider;
      'strona.location': StronaLocation;
      'strona.metadata': StronaMetadata;
      'strona.promo-card': StronaPromoCard;
      'strona.simple-content': StronaSimpleContent;
      'strona.user-card': StronaUserCard;
      'strona.user-info-section': StronaUserInfoSection;
      'zamowienie.products': ZamowienieProducts;
      'zdjecia.category': ZdjeciaCategory;
      'zdjecia.image-with-tags': ZdjeciaImageWithTags;
    }
  }
}
