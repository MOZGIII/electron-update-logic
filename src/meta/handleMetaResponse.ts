import * as repo from "./repo";

export interface MetaResponse {
  readonly status: number;
  json(): Promise<any>;
}

class MetadataFetchingError extends Error {
  constructor(readonly response: MetaResponse) {
    super(
      `Unable to fetch the metadata, server responded with ${response.status} status code`
    );
  }
}

const handleMetaResponse = async (
  response: MetaResponse
): Promise<repo.Metadata> => {
  const ok = response.status >= 200 && response.status < 300;
  if (!ok) {
    throw new MetadataFetchingError(response);
  }
  const metadata: repo.Metadata = await response.json();
  return metadata;
};

export default handleMetaResponse;
