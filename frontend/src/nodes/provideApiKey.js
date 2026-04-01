import { BaseNode } from '../components/BaseNode';
/*
* here user can provide api keys fpr the services they want to use
*/
export const ProvideApiKeyNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="API Key"
      description=""
      num_of_target={0}
      num_of_source={1}
      inputs={[
        {
          "key": "keyType",
          "type": "dropdown",
          "label": "Key Type:",
          "options": [
            { "key": "google_oauth", "value": "Google OAuth" },
            { "key": "github_auth", "value": "GitHub Auth" },
            { "key": "firebase_key", "value": "Firebase Key" },
            { "key": "stripe_key", "value": "Stripe Key" },
            { "key": "aws_key", "value": "AWS Key" },
            { "key": "openai_key", "value": "OpenAI Key" },
            { "key": "others", "value": "Others" },
          ],
        },
        {
          "key": "apiKey",
          "type": "textarea",
          "label": "API Key:",
        },
        {
          "key": "expirationDate",
          "type": "date",
          "label": "Expiration Date:",
        },
      ]}
      functions={{
        keyType: {
          getDefault: () => 'google_oauth',
        },
        apiKey: {
          getDefault: () => '',
        },
        expirationDate: {
          getDefault: () => '',
        },
      }}
      sourceIds={[`${id}-output`]}
    />
  );
};
