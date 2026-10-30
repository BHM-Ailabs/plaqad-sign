import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { PLAQAD_SIGN_NAME, PLAQAD_WEBSITE_URL } from '@documenso/lib/constants/plaqad-sign';
import { getDocumentByAccessToken } from '@documenso/lib/server-only/document/get-document-by-access-token';
import { redirect, useLoaderData } from 'react-router';

import { DocumentCertificateQRView } from '~/components/general/document/document-certificate-qr-view';

import type { Route } from './+types/share.$slug';

export function meta({ params: { slug } }: Route.MetaArgs) {
  if (slug.startsWith('qr_')) {
    return undefined;
  }

  const description = `I just signed a document with ${PLAQAD_SIGN_NAME}.`;

  return [
    { title: `Share - ${PLAQAD_SIGN_NAME}` },
    { name: 'description', content: description },
    { name: 'robots', content: 'noindex, nofollow' },
    {
      property: 'og:title',
      content: PLAQAD_SIGN_NAME,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/share/${slug}/opengraph`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/share/${slug}/opengraph`,
    },
    {
      name: 'twitter:description',
      content: description,
    },
  ];
}

export const loader = async ({ request, params: { slug } }: Route.LoaderArgs) => {
  if (slug.startsWith('qr_')) {
    const document = await getDocumentByAccessToken({ token: slug });

    if (!document) {
      throw redirect('/');
    }

    return {
      document,
      token: slug,
    };
  }

  const userAgent = request.headers.get('User-Agent') ?? '';

  if (/bot|facebookexternalhit|WhatsApp|google|bing|duckduckbot|MetaInspector/i.test(userAgent)) {
    return {};
  }

  // Non-crawler visitors of a share link are sent to the Plaqad website.
  throw redirect(PLAQAD_WEBSITE_URL);
};

export default function SharePage() {
  const { document, token } = useLoaderData<typeof loader>();

  if (document) {
    return (
      <DocumentCertificateQRView
        documentId={document.id}
        title={document.title}
        documentTeamUrl={document.documentTeamUrl}
        internalVersion={document.internalVersion}
        envelopeItems={document.envelopeItems}
        recipientCount={document.recipientCount}
        completedDate={document.completedAt ?? undefined}
        token={token}
      />
    );
  }

  return <div></div>;
}
