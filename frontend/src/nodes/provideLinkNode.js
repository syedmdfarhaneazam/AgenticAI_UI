import { BaseNode } from '../components/BaseNode';
/*
* here user can provide theie own scial links and then they can be used in the flow
*/
export const ProvideLinkNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="Links"
      description=""
      num_of_target={0}
      num_of_source={2}
      inputs={[
        {
          "key": "linkType",
          "type": "dropdown",
          "label": "Link Type:",
          "options": [
            { "key": "linkedin", "value": "LinkedIn" },
            { "key": "instagram", "value": "Instagram" },
            { "key": "github", "value": "GitHub" },
            { "key": "facebook", "value": "Facebook" },
            { "key": "twitter", "value": "Twitter" },
            { "key": "youtube", "value": "YouTube" },
            { "key": "tiktok", "value": "TikTok" },
            { "key": "others", "value": "Others" },
          ],
        },
        {
          "key": "link",
          "type": "text",
          "label": "Link:",
        },
      ]}
      functions={{
        linkType: {
          getDefault: () => 'linkedin',
        },
        link: {
          getDefault: () => '',
        },
      }}
      sourceIds={[`${id}-source1`, `${id}-source2`]}
    />
  );
};
