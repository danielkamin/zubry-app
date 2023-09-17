import { PzkoszSettings } from '@/types';
//otypowanie wszystkich content itemów wraz z polami takimi jak pojedyncze i wielokrotne zdjęcia
export type TStrapiBaseComponent = {
  id: number;
  __component: string;
};
export type TStrapiContentItem<T> = {
  id: number;
  attributes: T;
};

export type TStrapiTimestamp = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type TStrapiBasicImage = {
  name: string;
  width: number;
  height: number;
  url: string;
};

export type TStrapiImageWithFormats = {
  formats: {
    small: TStrapiBasicImage;
    medium: TStrapiBasicImage;
    thumbnail: TStrapiBasicImage;
  };
} & TStrapiBasicImage;

export type TStrapiImageWithAdditionalInfo = {
  caption?: string;
  alternativeText?: string;
  mime: string;
  ext: string;
  hash: string;
  size: number;
} & TStrapiImageWithFormats;

export type TStrapiMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type TStrapiArrayResponse<T> = {
  data: Array<TStrapiContentItem<T>>;
  meta: TStrapiMeta;
};

export type TStrapiObjectResponse<T> = {
  data: TStrapiContentItem<T>;
  meta: TStrapiMeta;
};

export type TStrapiPlayer = {
  Number: number;
  First_Name: string;
  Last_Name: string;
  Birthday: string;
  Position: string;
  Info: string;
  Height: number;
  Photo: {
    data: TStrapiContentItem<TStrapiImageWithAdditionalInfo>;
  };
  Images: {
    data?: TStrapiContentItem<TStrapiImageWithAdditionalInfo>[];
  };
  Average_Points: number;
  Average_Rebounds: number;
  Average_Asists: number;
  Average_Minutes: number;
};

export type TStrapiCoach = {
  First_Name: string;
  Last_Name: string;
  Position: string;
  Photo: { data: TStrapiContentItem<TStrapiImageWithFormats> };
};

export type TStrapiYoutubePlayerLink = {
  Url: string;
};

export type TStrapiSponsor = {
  Description: string;
  Name: string;
  Image: { data: TStrapiContentItem<TStrapiImageWithFormats> };
  Order: number;
  Url: string;
};

export type TStrapiArticle = {
  Content: string;
  Image: {
    data: TStrapiContentItem<TStrapiImageWithFormats>;
  };
  Title: string;
} & TStrapiTimestamp;

export type TStrapiContactData = {
  Phone_Number: string;
  Address: string;
  Opening_Hours: string;
  KRS: string;
  REGON: string;
  NIP: string;
  Bank_Account_Number: string;
};

export type TStrapiPzkoszSettings = {
  settings: PzkoszSettings | string;
} & TStrapiTimestamp;

export type TStrapiManagementMember = {
  First_Name: string;
  Last_Name: string;
  Position: string;
  Image: {
    data: TStrapiContentItem<TStrapiImageWithFormats>;
  };
};

export type TStrapi3LMSchedule = {
  Stage_Name: string;
  Schedule: TStrapiScheduleItem[];
};

export type TStrapiScheduleItem = {
  Host_Team: string;
  Away_Team: string;
  Host_Points: number;
  Away_Points: number;
  Game_Date: string;
  Game_Stage_Number: number;
} & TStrapiBaseComponent;

export type TStrapi3LMLeaderboard = {
  Stage_Name: string;
  Table: TStrapiLeaderBoardItem[];
};

export type TStrapiLeaderBoardItem = {
  Name: string;
  Rank: number;
  Games: number;
  Wins: number;
  Losses: number;
  Points: number;
} & TStrapiBaseComponent;

export type TStrapiGalleryCategory = {
  Title: string;
  Images?: {
    data: TStrapiContentItem<TStrapiImageWithAdditionalInfo>[];
  };
  Thumbnail: {
    data: TStrapiContentItem<TStrapiImageWithAdditionalInfo>;
  };
} & TStrapiBaseComponent;

export type TStrapiClubGallery = {
  Categories: TStrapiGalleryCategory[];
  Preview: {
    data: TStrapiContentItem<TStrapiImageWithAdditionalInfo>[];
  };
};

export type TStrapiProduct = {
  Price: number;
  Sizes?: any;
  Category?: { data: any };
  Name: string;
  Description: string;
  Image: { data: TStrapiContentItem<TStrapiImageWithFormats> };
  imageUrl?: string;
};

export type TStrapiOrder = {
  Order_Date: string;
  Order_Sent_Date: string | null;
  Is_Sent: boolean;
  Is_Realized: boolean;
  Note: string;
  Order_Number: string;
  First_Name: string;
  Last_Name: string;
  Zip_Code: string;
  Apartment_Number: string;
  Building_Number: string;
  Is_Returned: boolean;
  City: string;
  Phone_Number: string;
  Details: Array<
    {
      Count: number;
      Product: {
        data: TStrapiContentItem<TStrapiProduct>;
      };
      Size: {
        data: TStrapiContentItem<{
          Size: string;
        }>;
      };
    } & TStrapiBaseComponent
  >;
};

export type TStrapiComplaint = {
  Complaint_Date: string;
  Complaint_Realization_Date: string;
  Is_Realized: boolean;
  Additional_Info: string;
  Order?: { data: TStrapiContentItem<TStrapiOrder> };
};

export type TStrapiReturn = {
  Return_Date: string;
  Return_Realization_Date: string;
  Is_Realized: boolean;
  Note: string;
  Order?: { data: TStrapiContentItem<TStrapiOrder> };
  User: { data: TStrapiContentItem<TStrapiUser> };
};

export type TStrapiUser = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  First_Name: string;
  Last_Name: string;
};

export type TStrapiTeamBanner = {
  Image: { data: TStrapiContentItem<TStrapiImageWithFormats> };
};

type TStrapiBaseItemWithContent = {
  Content: string;
};

export type TStrapiShopRegulations = TStrapiBaseItemWithContent;

export type TStrapiDeliveryRegulations = TStrapiBaseItemWithContent;

export type TStrapiReturnsRegulations = TStrapiBaseItemWithContent;

export type TStrapiPrivacyPolicy = TStrapiBaseItemWithContent;

export type TStrapiCookieRegulations = {
  Title: string;
  Image: { data: TStrapiContentItem<TStrapiImageWithFormats> };
} & TStrapiBaseItemWithContent;

export type TStrapiTaxTransfer = TStrapiBaseItemWithContent;

export type TStrapiClubHistory = TStrapiBaseItemWithContent;

export type TStrapiClubManagementInfo = TStrapiBaseItemWithContent;

export type TStrapiComplaintsRegulations = TStrapiBaseItemWithContent;

export type TStrapiGlobalSettings = {
  Youtube_Url: string;
  Shop_Intro: string;
  Youtube_Intro: string;
  Club_Intro: string;
  Team_Banner: { data: TStrapiContentItem<TStrapiImageWithFormats> };
};
export type TStrapiComponent = Record<string, any> & TStrapiBaseComponent;

export type TStrapiDynamicPage = {
  Title: string;
  Page_Url: string;
  Order: number;
  Metadata: {
    id: number;
    Meta_Title: string;
    Meta_Description: string;
  };
  Page_Content: Array<TStrapiComponent>;
} & TStrapiTimestamp;
