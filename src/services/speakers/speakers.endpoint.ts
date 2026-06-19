const BASE_SPEAKERS_URL = '/speakers';

const speakersEndpoint = {
  speakers: BASE_SPEAKERS_URL,
  speakerById: (speakerId: string) => `${BASE_SPEAKERS_URL}/${speakerId}`,
};

export default speakersEndpoint;
