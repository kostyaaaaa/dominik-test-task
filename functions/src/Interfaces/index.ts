export interface DownloadFileDto {
  envelope: string;
  // envelope id
  document: string;
  // document id
}

// stored in /envelopes/{id}
export interface Envelope {
  id: string;
  docs: string[];
  users: string[];
  status: EnvelopeStatus;
}

export interface IEnvelop {
  data: () => Envelope;
}

// document id
// user ids
enum EnvelopeStatus {
  PROGRESS,
  DONE,
}
