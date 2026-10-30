import {
  DOCUMENSO_WEBSITE_URL,
  PLAQAD_SIGN_NAME,
  PLAQAD_SIGN_SOURCE_URL,
  PLAQAD_WEBSITE_URL,
} from '@documenso/lib/constants/plaqad-sign';
import { cn } from '@documenso/ui/lib/utils';
import { Trans } from '@lingui/react/macro';

const LINK_CLASS_NAME = 'underline-offset-2 duration-200 hover:text-foreground hover:underline';

export type PlaqadSignFooterProps = {
  className?: string;
  /**
   * `inline` marks a footer rendered inside a full-screen view (signing views, error screens).
   * While one is on the page, `layout` footers are hidden (see `packages/ui/styles/theme.css`)
   * so the layout copy never duplicates it or sits underneath fixed signing controls.
   */
  placement?: 'layout' | 'inline';
};

/**
 * Product attribution and the AGPL-3.0 section 13 source offer.
 *
 * Must stay visible to every network user (signing, public and authenticated pages).
 */
export const PlaqadSignFooter = ({ className, placement = 'layout' }: PlaqadSignFooterProps) => {
  return (
    <p
      data-plaqad-sign-footer={placement}
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-muted-foreground text-xs',
        className,
      )}
    >
      <a href={PLAQAD_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS_NAME}>
        {PLAQAD_SIGN_NAME}
      </a>
      <span aria-hidden="true">·</span>
      <span>
        Powered by{' '}
        <a href={DOCUMENSO_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS_NAME}>
          Documenso
        </a>
      </span>
      <span aria-hidden="true">·</span>
      <a href={PLAQAD_SIGN_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS_NAME}>
        <Trans>Source code</Trans>
      </a>
    </p>
  );
};
