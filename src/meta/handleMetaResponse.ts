import * as repo from "./repo";

class MetadataFetchingError extends Error {
  constructor(readonly response: Response) {
    super(
      `Unable to fetch the metadata, server responded with ${response.status} status code`
    );
  }
}

const handleMetaResponse = async (
  response: Response
): Promise<repo.Metadata> => {
  if (!response.ok) {
    throw new MetadataFetchingError(response);
  }
  const metadata: repo.Metadata = await response.json();
  return metadata;
};

export default handleMetaResponse;
