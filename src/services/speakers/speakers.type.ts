type TSocial = {
  name: string;
  icon: string;
  url: string;
};

export interface ISpeaker {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  talks: string[];
  topics: string[];
  social: TSocial[];
  events: string[];
  avatarColor: string;
  imageUrl: string;
}
