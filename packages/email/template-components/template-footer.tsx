import { DOCUMENSO_WEBSITE_URL, PLAQAD_SIGN_NAME, PLAQAD_WEBSITE_URL } from '@documenso/lib/constants/plaqad-sign';
import { Trans } from '@lingui/react/macro';
import { Fragment } from 'react';

import { Link, Section, Text } from '../components';
import { useBranding } from '../providers/branding';
import { getSafeBrandingUrl } from '../utils/branding-url';

export type TemplateFooterProps = {
  isDocument?: boolean;
  reportUrl?: string;
};

export const TemplateFooter = ({ isDocument = true, reportUrl }: TemplateFooterProps) => {
  const branding = useBranding();

  const safeBrandingUrl = branding.brandingEnabled ? getSafeBrandingUrl(branding.brandingUrl) : null;

  return (
    <Section>
      {reportUrl && (
        <Text className="my-4 text-base text-muted-foreground">
          <Trans>
            Did not expect this email?{' '}
            <Link className="text-primary" href={reportUrl}>
              Click here to report the sender
            </Link>
            . Never sign a document you don't recognize or weren't expecting.
          </Trans>
        </Text>
      )}

      {isDocument && !branding.brandingHidePoweredBy && (
        <Text className="my-4 text-base text-muted-foreground">
          {/* The catalog rebrands this message's link text to "Plaqad Sign" in every locale. */}
          <Trans>
            This document was sent using{' '}
            <Link className="text-primary" href={PLAQAD_WEBSITE_URL}>
              Documenso
            </Link>
            .
          </Trans>
        </Text>
      )}

      {branding.brandingEnabled && branding.brandingCompanyDetails && (
        <Text className="my-8 text-muted-foreground text-sm">
          {branding.brandingCompanyDetails.split('\n').map((line, idx) => {
            return (
              <Fragment key={idx}>
                {idx > 0 && <br />}
                {line}
              </Fragment>
            );
          })}
        </Text>
      )}

      {branding.brandingEnabled && safeBrandingUrl && (
        <Text className="my-8 text-muted-foreground text-sm">
          <Link href={safeBrandingUrl} target="_blank">
            {safeBrandingUrl}
          </Link>
        </Text>
      )}

      {!branding.brandingEnabled && (
        <Text className="my-8 text-muted-foreground text-sm">
          {PLAQAD_SIGN_NAME}
          <br />
          <Link className="text-muted-foreground" href={PLAQAD_WEBSITE_URL} target="_blank">
            plaqad.com
          </Link>
        </Text>
      )}

      {!branding.brandingHidePoweredBy && (
        <Text className="my-4 text-muted-foreground text-xs">
          <Trans>Powered by</Trans>{' '}
          <Link className="text-muted-foreground underline" href={DOCUMENSO_WEBSITE_URL} target="_blank">
            Documenso
          </Link>
        </Text>
      )}
    </Section>
  );
};

export default TemplateFooter;
