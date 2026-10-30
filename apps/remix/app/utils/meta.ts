import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { PLAQAD_SIGN_NAME } from '@documenso/lib/constants/plaqad-sign';
import { i18n, type MessageDescriptor } from '@lingui/core';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description = "Plaqad Sign is Plaqad's secure electronic signing service.";

  return [
    {
      title: title ? `${i18n._(title)} - ${PLAQAD_SIGN_NAME}` : PLAQAD_SIGN_NAME,
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'author',
      content: 'Plaqad',
    },
    {
      // Private operator-run service: signing and share URLs are bearer tokens.
      name: 'robots',
      content: 'noindex, nofollow',
    },
    {
      property: 'og:title',
      content: PLAQAD_SIGN_NAME,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
